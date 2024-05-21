import { bodyParser } from "./body-parser";
import { cors } from "./cors";
import { errorHandler } from "./error-handler";
import { securityHeaders } from "./security-headers";
import { timeoutHandler } from "./timeout-handler";
import { unusedRoutes } from "./unused-routes";

export default {
	bodyParser,
	cors,
	errorHandler,
	securityHeaders,
	timeoutHandler,
	unusedRoutes,
};
