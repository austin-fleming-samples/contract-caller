// RFC 7807
type ProblemJsonResponse = {
	detail?: string;
	instance?: string;
	status: number;
	title: string;
};

type BaseErrorOptions = {
	detail?: string;
	instance?: string;
	status: number;
	title: string;
	wrappedError?: Error;
};

export class ApiError extends Error {
	private readonly _title: string;
	private readonly _status: number;
	private readonly _detail?: string;
	private readonly _wrappedError?: Error;
	// NOTE: Problem JSON's "instance" field should be derived in middleware
	private _instance: string;

	constructor(properties: BaseErrorOptions) {
		super(properties.title);
		// restore prototype chain that "message" breaks.
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = "ApiError";

		this._title = properties.title;
		this._status = properties.status;
		this._detail = properties.detail || "";
		this._wrappedError = properties.wrappedError;
		this._instance = properties.instance || "";

		Error.captureStackTrace(this, this.constructor);
	}

	public setInstance(instance: string) {
		this._instance = instance;
		// ensure function is chainable to simplify the common case of BaseError.setInstance('').toDTO()
		return this;
	}

	/**
	 * Formats error into a Problem+JSON object that can be sent to the client.
	 * See this link for an explanation of problem+json: https://datatracker.ietf.org/doc/html/rfc7807
	 */
	public toDTO(): ProblemJsonResponse {
		return {
			status: this._status,
			title: this._title,
			...(this._detail && { detail: this._detail }),
			...(this._instance && { instance: this._instance }),
		};
	}

	/**
	 * FOR INTERNAL LOGGING ONLY, can potentially expose sensitive details.
	 */
	public inspect() {
		return {
			detail: this._detail,
			instance: this._instance,
			message: this.message,
			status: this._status,
			title: this._title,
			wrappedError: this._wrappedError,
		};
	}

	public inspectWithStack() {
		return {
			...this.inspect(),
			stack: this.stack,
		};
	}

	public static isApiError(value: unknown): value is ApiError {
		return value instanceof ApiError;
	}
}
