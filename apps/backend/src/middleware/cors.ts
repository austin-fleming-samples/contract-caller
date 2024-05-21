import { MIDDLEWARE_CONFIG } from "@/config";
import corsMiddleware = require("cors");

export const cors = corsMiddleware({
	// TODO: possibly harden this depending on if API should be public.
	origin: MIDDLEWARE_CONFIG.origins,
});
