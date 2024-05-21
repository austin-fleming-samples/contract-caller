import { CONFIG } from "@/config";
import type { Nullable } from "@/utils/nullable";
import { windowExists } from "@/utils/window-exists";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

export const initWeb3Modal = (): Nullable<Web3Modal> =>
	windowExists()
		? new Web3Modal({
				network: "3",
				cacheProvider: true,
				theme: "dark",
				providerOptions: {
					walletconnect: {
						package: WalletConnectProvider,
						options: {
							rpc: {
								3: CONFIG.rpcNodes.ropsten,
							},
						},
					},
				},
		  })
		: undefined;
