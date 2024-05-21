import { ApiError } from "@/utils/error-handling/api-error";
import { Result } from "@/utils/error-handling/result";
import { isNumber } from "@/utils/validation/is-number";
import { isString } from "@/utils/validation/is-string";

export class Counter {
	private static readonly minimumValue = BigInt(1e15);

	private constructor(private readonly value: bigint) {}

	public static parse(value: unknown): Result<Counter> {
		try {
			if (!value)
				return {
					error: new ApiError({ status: 400, title: "invalid value", detail: "is missing" }),
				};

			if (!(isString(value) || isNumber(value)))
				return {
					error: new ApiError({
						status: 400,
						title: "invalid value",
						detail: "must be string or number",
					}),
				};

			const bigintValue = BigInt(value);
			if (bigintValue < this.minimumValue)
				return {
					error: new ApiError({
						status: 400,
						title: "value too small",
						detail: "must be at least 1e15",
					}),
				};

			return { ok: new Counter(bigintValue) };
		} catch (error) {
			if (ApiError.isApiError(error)) {
				return { error };
			}

			return {
				error: new ApiError({
					status: 400,
					title: "Invalid value",
					detail: "Could not parse the provided value",
					wrappedError: error as Error,
				}),
			};
		}
	}

	public toValue() {
		return this.value;
	}

	public toString() {
		return this.value.toString();
	}
}
