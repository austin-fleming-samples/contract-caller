import { ApiError } from "@/utils/error-handling/api-error";
import type { RequestHandler } from "express";

export const unusedRoutes: RequestHandler = (request, response, next) =>
	next(
		new ApiError({
			status: 404,
			title: "Not found",
		}),
	);
