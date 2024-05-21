import { CONFIG } from "@/config";
import { ethers } from "ethers";
import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { AssessorReducer, initialAssessorState } from "./assessor.reducer";
import type { AssessorState } from "./assessor.reducer";
import { useAuthContext } from "../auth";

export const useAssessor = (): AssessorState => {
	const { signer, connectionStatus } = useAuthContext();
	const [assessorState, dispatch] = useReducer(AssessorReducer, initialAssessorState);

	// setup contract
	useEffect(() => {
		console.log("effect triggered");
		// bail out if user's wallet isn't yet connected
		if (!signer || connectionStatus !== "CONNECTED") {
			// Reset if logout triggers effect
			dispatch({ type: "RESET" });
			return;
		}
		console.log("passed guard");
		// bail out if contract already connected
		if (assessorState.contract && assessorState.contractAddress) return;

		const contract = new ethers.Contract(CONFIG.contractAddress, CONFIG.abi, signer);
		if (!contract) {
			toast.error("Could not connect to contract.");
			return;
		}

		dispatch({
			type: "SET_CONTRACT",
			payload: { contractAddress: CONFIG.contractAddress, contract },
		});
	}, [signer, connectionStatus]);

	const loadLastNumber = async () => {
		if (!assessorState.contract) {
			toast.error("Contract is not yet connected.");
			return;
		}

		const response = await assessorState.contract.lastNum();
		if (!response) {
			toast.error("Failed to get last number from contract.");
			return;
		}

		const lastNumber = ethers.BigNumber.from(response);
		const lastNumberString = lastNumber.toString();

		dispatch({
			type: "SET_LAST_NUMBER",
			payload: {
				lastNumber,
				lastNumberString,
			},
		});
	};

	const requestNextNumber = async () => {
		if (!assessorState.contract) {
			toast.error("Contract is not yet connected.");
			return;
		}
		if (!assessorState.lastNumber) {
			toast.error("Last number must be loaded before getting the next number.");
			return;
		}

		dispatch({ type: "SET_PENDING_NEXT_NUMBER", payload: { pendingNextNumber: true } });

		try {
			// increment last number then pass it contract's "assessMe" method.
			const nextNumber = assessorState.lastNumber.add(1);
			const response = await assessorState.contract.assessMe(nextNumber);

			if (!response) {
				throw new Error("Failed to get next number.");
			}

			await response.wait();

			console.log({ response });

			// refresh last number
			await loadLastNumber();
		} catch (error) {
			console.error(error);
			toast.error("Failed to get next number");
		}

		dispatch({ type: "SET_PENDING_NEXT_NUMBER", payload: { pendingNextNumber: false } });
	};

	return {
		...assessorState,
		loadLastNumber,
		requestNextNumber,
	};
};
