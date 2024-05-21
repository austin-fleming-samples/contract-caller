import type { RequestHandler } from "express";
import { writeCounterUsecase } from "./write-counter.usecase";

export const writeCounterController: RequestHandler = async (request, response, next) => {
	const { privateKey, value } = request.body;

	const result = await writeCounterUsecase({ privateKey, value });

	if (result.error) return next(result.error);

	return response.status(200).json(result.ok);
};
