import type { Nullable } from "@/utils/nullable";
import type { ethers } from "ethers";
import type Web3Modal from "web3modal";

export type AuthState = {
	address: Nullable<string>;
	balance: Nullable<string>;
	chainId: Nullable<number>;
	connectionStatus: "DISCONNECTED" | "CONNECTING" | "CONNECTED";
	errorMessage: Nullable<string>;
	modalInstance: Nullable<Web3Modal>;
	network: Nullable<string>;
	provider: Nullable<ethers.providers.Web3Provider>;
	signer: Nullable<ethers.providers.JsonRpcSigner>;
	connect: () => Promise<boolean>;
	disconnect: () => Promise<boolean>;
};

export const initialAuthState: AuthState = {
	address: undefined,
	balance: undefined,
	chainId: undefined,
	connectionStatus: "DISCONNECTED",
	errorMessage: undefined,
	modalInstance: undefined,
	network: undefined,
	provider: undefined,
	signer: undefined,
	connect: async () => false,
	disconnect: async () => false,
};

type AuthReducerActions =
	| {
			type: "SET_CONNECTION_STATE";
			payload: Pick<AuthState, "connectionStatus">;
	  }
	| {
			type: "SET_COMMANDS";
			payload: Pick<AuthState, "connect" | "disconnect">;
	  }
	| {
			type: "SET_ERROR";
			payload: Pick<AuthState, "errorMessage">;
	  }
	| {
			type: "SET_PROVIDER_DETAILS";
			payload: Pick<
				AuthState,
				| "address"
				| "balance"
				| "chainId"
				| "connectionStatus"
				| "modalInstance"
				| "network"
				| "provider"
				| "signer"
			>;
	  }
	| {
			type: "RESET";
	  };

export const AuthReducer = (currentState: AuthState, action: AuthReducerActions): AuthState => {
	switch (action.type) {
		case "SET_CONNECTION_STATE":
		case "SET_COMMANDS":
		case "SET_PROVIDER_DETAILS":
			return { ...currentState, ...action.payload, errorMessage: undefined };
		case "SET_ERROR":
			return { ...initialAuthState, ...action.payload };
		case "RESET":
			return initialAuthState;
		default:
			// @ts-expect-error: type is cast to never
			throw new Error(`${action.type} is not a valid auth action`);
	}
};
