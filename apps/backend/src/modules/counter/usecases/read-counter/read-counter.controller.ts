import type { RequestHandler } from "express";
import { readCounterUsecase } from "./read-counter.usecase";

export const readCounterController: RequestHandler = async (request, response, next) => {
	const result = await readCounterUsecase();

	if (result.error) return next(result.error);

	return response.status(200).json(result.ok);
};
