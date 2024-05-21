import { MIDDLEWARE_CONFIG } from "@/config";
import { ApiError } from "@/utils/error-handling/api-error";
import type { RequestHandler } from "express";

// Give it up to 30 blocks to resolve, else go ahead and hang up the connection.
const DEFAULT_TIMEOUT = 30 * MIDDLEWARE_CONFIG.ethBlockTime;

export const timeoutHandler: RequestHandler = (request, response, next) => {
	// Set the timeout for all HTTP requests
	request.setTimeout(DEFAULT_TIMEOUT, () => {
		next(
			new ApiError({
				detail: `request exceeded the default response timeout of ${DEFAULT_TIMEOUT / 1000}s`,
				status: 408,
				title: "request took too long",
			}),
		);
	});

	// Set the server response timeout for all HTTP requests
	response.setTimeout(DEFAULT_TIMEOUT, () => {
		next(
			new ApiError({
				detail: `response exceeded the default response timeout of ${DEFAULT_TIMEOUT / 1000}s`,
				status: 503,
				title: "service unavailable",
			}),
		);
	});

	next();
};
