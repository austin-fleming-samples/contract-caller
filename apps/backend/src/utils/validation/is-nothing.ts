import type { Nothing } from "../helpers/nothing";

export const isNothing = (value: unknown): value is Nothing =>
	value === undefined || value === null;
