import { ethers } from "ethers";
import { useCallback, useEffect, useReducer } from "react";
import { AuthReducer, AuthState, initialAuthState } from "./auth.reducer";
import toast from "react-hot-toast";
import { isFunction } from "@/utils/is-function";
import { initWeb3Modal } from "./auth.web3modal";
import { CONFIG } from "@/config";

const web3modal = initWeb3Modal();

export const useAuth = (): AuthState => {
	const [authState, dispatch] = useReducer(AuthReducer, initialAuthState);

	const connect = useCallback(async () => {
		if (!web3modal) {
			toast.error("No compatible wallet found to use for log in.");
			return false;
		}

		dispatch({ type: "SET_CONNECTION_STATE", payload: { connectionStatus: "CONNECTING" } });

		const modalInstance = await web3modal.connect().catch((_) => {
			// neutralize error that throws if modal is closed.
			return;
		});
		if (!modalInstance) {
			// clean-up state
			dispatch({ type: "RESET" });
			return false;
		}

		const provider = new ethers.providers.Web3Provider(modalInstance);
		const { chainId, name } = await provider.getNetwork();

		if (name !== CONFIG.network) {
			dispatch({ type: "SET_ERROR", payload: { errorMessage: 'Set your network to "ropsten".' } });
			return false;
		}

		const signer = provider.getSigner();
		const address = await signer.getAddress();
		const rawBalance = await signer.getBalance();
		const ethBalance = ethers.utils.formatEther(rawBalance);

		dispatch({
			type: "SET_PROVIDER_DETAILS",
			payload: {
				address,
				balance: ethBalance,
				chainId,
				connectionStatus: "CONNECTED",
				modalInstance,
				network: name,
				provider,
				signer,
			},
		});

		return true;
	}, []);

	const disconnect = useCallback(async () => {
		web3modal?.clearCachedProvider();

		// Some providers may have a disconnect method
		if (isFunction((authState?.provider as any)?.disconnect)) {
			await (authState.provider as any).disconnect();
		}

		dispatch({ type: "RESET" });
		toast("Logged out");

		return true;
	}, [authState.provider]);

	// Persist login between page refreshes
	useEffect(() => {
		if (web3modal?.cachedProvider) {
			connect();
		}
	}, [connect]);

	// TODO: listeners
	// Setup listeners
	// useEffect(() => {
	// 	if (!web3modal || !connectorState.provider?.on) return;
	// }, []);

	useEffect(() => {
		if (!web3modal || !authState.provider?.on) return;

		const handleAddressChange = (accounts: string[]) => {
			toast("Account change detected.");
			disconnect();
		};

		const handleChainChanged = (hexChainId: string) => {
			toast("Chain change detected.");
			disconnect();
		};

		const handleDisconnect = (error: unknown) => {
			console.error(error);
			disconnect();
		};

		authState.provider.on("accountsChanged", handleAddressChange);
		authState.provider.on("chainChanged", handleChainChanged);
		authState.provider.on("disconnect", handleDisconnect);

		return () => {
			if (!authState.provider?.removeListener) return;

			authState.provider.removeListener("accountsChanged", handleAddressChange);
			authState.provider.removeListener("chainChanged", handleChainChanged);
			authState.provider.removeListener("disconnect", handleDisconnect);
		};
	}, [authState.provider, disconnect]);

	return {
		...authState,
		connect,
		disconnect,
	};
};
