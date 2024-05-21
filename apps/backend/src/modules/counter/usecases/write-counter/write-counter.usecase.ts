import type { Result } from "@/utils/error-handling/result";
import { Counter } from "../../domain/counter.model";
import { PrivateKey } from "../../domain/private-key.model";
import { counterRepo, CounterRepo } from "../../repo/repo";

type WriteCounterRequest = {
	value: string | number;
	privateKey: string;
};

type WriteCounterResponse = {
	value: string;
	transactionHash: string;
};

const makeWriteCounterUsecase =
	(repo: CounterRepo) =>
	async (props: WriteCounterRequest): Promise<Result<WriteCounterResponse>> => {
		const counter = Counter.parse(props.value);
		if (counter.error) return counter;

		const privateKey = await PrivateKey.parse(props.privateKey);
		if (privateKey.error) return privateKey;

		const writeResult = await repo.write(counter.ok, privateKey.ok);
		if (writeResult.error) return writeResult;

		return {
			ok: {
				value: writeResult.ok.counter.toString(),
				transactionHash: writeResult.ok.transactionHash,
			},
		};
	};

export const writeCounterUsecase = makeWriteCounterUsecase(counterRepo);
