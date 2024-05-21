import { ApiError } from "@/utils/error-handling/api-error";
import { Result } from "@/utils/error-handling/result";
import { isString } from "@/utils/validation/is-string";
import { ethers } from "ethers";
import { REPO_CONFIG } from "../repo/repo.config";

export class PrivateKey {
	private constructor(private readonly value: string) {}

	public static async parse(value: unknown): Promise<Result<PrivateKey>> {
		try {
			if (!value) {
				throw new ApiError({
					status: 400,
					title: "PrivateKey is missing",
				});
			}

			if (!isString(value)) {
				throw new ApiError({
					status: 400,
					title: "PrivateKey is in an invalid format",
				});
			}

			// confirm private key is for a real account
			// in production, it would be bad form to pull a repo config into here.
			const wallet = new ethers.Wallet(value, REPO_CONFIG.rpcProvider);
			const balance = await wallet.getBalance();

			if (balance.eq(0)) {
				throw new ApiError({
					status: 400,
					title: "Unusable account",
					detail: "Account for private key is either empty or non-existent.",
				});
			}

			return { ok: new PrivateKey(value) };
		} catch (error) {
			console.log({ error });
			if (ApiError.isApiError(error)) return { error };

			return {
				error: new ApiError({
					status: 400,
					title: "Invalid privateKey",
					detail: "could not parse the provided privateKey",
				}),
			};
		}
	}

	public toValue() {
		return this.value;
	}
}
