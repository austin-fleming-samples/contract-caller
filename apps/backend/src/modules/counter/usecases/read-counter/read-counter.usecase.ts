import type { Result } from "@/utils/error-handling/result";
import { counterRepo, CounterRepo } from "../../repo/repo";

export type ReadUsecaseResponse = {
	value: string;
};

const makeReadCounterUsecase =
	(repo: CounterRepo) => async (): Promise<Result<ReadUsecaseResponse>> => {
		const readResult = await repo.read();
		if (readResult.error) return readResult;

		return {
			ok: {
				value: readResult.ok.toString(),
			},
		};
	};

export const readCounterUsecase = makeReadCounterUsecase(counterRepo);
