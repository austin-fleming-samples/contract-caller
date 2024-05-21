import { ApiError } from "@/utils/error-handling/api-error";
import { Result } from "@/utils/error-handling/result";
import { ethers } from "ethers";
import { Counter } from "../domain/counter.model";
import { PrivateKey } from "../domain/private-key.model";
import { REPO_CONFIG } from "./repo.config";

export interface CounterRepo {
	read: () => Promise<Result<Counter>>;
	write: (
		counter: Counter,
		privateKey: PrivateKey,
	) => Promise<Result<{ counter: Counter; transactionHash: string }>>;
}

const readCounterRepo: CounterRepo["read"] = async () => {
	const contract = new ethers.Contract(
		REPO_CONFIG.contractAddress,
		REPO_CONFIG.abi,
		REPO_CONFIG.rpcProvider,
	);

	const maybeBigNumber = await contract.lastNum();

	if (!maybeBigNumber)
		return {
			error: new ApiError({
				status: 502,
				title: "Could not read count",
				detail: "No response was received from the smart contract.",
			}),
		};

	const stringRepresentation = (maybeBigNumber as ethers.BigNumber).toString();

	return Counter.parse(stringRepresentation);
};

const writeCounterRepo: CounterRepo["write"] = async (counter, privateKey) => {
	const wallet = new ethers.Wallet(privateKey.toValue(), REPO_CONFIG.rpcProvider);
	const contract = new ethers.Contract(REPO_CONFIG.contractAddress, REPO_CONFIG.abi, wallet);

	const outcome = await contract.assessMe(counter.toValue());
	if (!outcome)
		return {
			error: new ApiError({
				status: 502,
				title: "Could not update count",
				detail: "No response was received from the smart contract.",
			}),
		};

	// confirm transaction did not revert
	const { status, transactionHash } = await outcome.wait();
	if (status === 0)
		return {
			error: new ApiError({
				status: 502,
				title: "Transaction was reverted",
			}),
		};

	return {
		ok: {
			transactionHash,
			counter,
		},
	};
};

export const counterRepo: CounterRepo = {
	read: readCounterRepo,
	write: writeCounterRepo,
};
