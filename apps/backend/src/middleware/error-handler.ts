import { ApiError } from "@/utils/error-handling/api-error";
import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
	const instance = request.path;

	if (ApiError.isApiError(error)) {
		error.setInstance(instance);

		console.error("API ERROR ::", JSON.stringify(error.inspect()));

		const dto = error.toDTO();
		return response.status(dto.status).json(dto);
	}

	// if it wasn't a recognized error, cast it to a 500, log it, and return the formatted error
	const uncaughtError = new ApiError({
		instance,
		status: 500,
		title: "an unexpected error occurred",
		wrappedError: error,
	});

	console.error("API ERROR ::", JSON.stringify(uncaughtError.inspect()));

	const uncaughtDTO = uncaughtError.toDTO();
	return response.status(uncaughtDTO.status).json(uncaughtDTO);
};
