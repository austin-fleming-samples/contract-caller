import { Nothing } from "../helpers/nothing";
import { ApiError } from "./api-error";

export type Result<T, E = ApiError> = { ok: T; error?: Nothing } | { ok?: Nothing; error: E };
