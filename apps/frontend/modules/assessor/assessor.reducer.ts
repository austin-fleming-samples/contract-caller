import type { Nullable } from "@/utils/nullable";
import { ethers } from "ethers";

export type AssessorState = {
	contractAddress: Nullable<string>;
	contract: Nullable<ethers.Contract>;
	lastNumber: Nullable<ethers.BigNumber>;
	lastNumberString: Nullable<string>;
	pendingNextNumber: boolean;
	loadLastNumber: () => Promise<void>;
	requestNextNumber: () => Promise<void>;
};

export const initialAssessorState: AssessorState = {
	contractAddress: undefined,
	contract: undefined,
	lastNumber: undefined,
	lastNumberString: undefined,
	pendingNextNumber: false,
	loadLastNumber: async () => {},
	requestNextNumber: async () => {},
};

type AssessorReducerAction =
	| {
			type: "SET_CONTRACT";
			payload: Pick<AssessorState, "contractAddress" | "contract">;
	  }
	| {
			type: "SET_LAST_NUMBER";
			payload: Pick<AssessorState, "lastNumber" | "lastNumberString">;
	  }
	| {
			type: "SET_PENDING_NEXT_NUMBER";
			payload: Pick<AssessorState, "pendingNextNumber">;
	  }
	| {
			type: "SET_COMMANDS";
			payload: Pick<AssessorState, "loadLastNumber" | "requestNextNumber">;
	  }
	| {
			type: "RESET";
	  };

export const AssessorReducer = (
	currentState: AssessorState,
	action: AssessorReducerAction,
): AssessorState => {
	switch (action.type) {
		case "SET_CONTRACT":
		case "SET_LAST_NUMBER":
		case "SET_COMMANDS":
		case "SET_PENDING_NEXT_NUMBER":
			return { ...currentState, ...action.payload };
		case "RESET":
			return initialAssessorState;
		default:
			// @ts-expect-error: type is cast to never
			throw new Error(`${action.type} is not a valid assessor action`);
	}
};
