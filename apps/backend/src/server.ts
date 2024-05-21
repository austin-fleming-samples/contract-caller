import express from "express";
import { SERVER_CONFIG } from "./config";
import middleware from "./middleware";
import { mountCounterRoutes } from "./modules/counter/http/routes";

const startServer = async () => {
	const app = express();

	app
		// pre-ware
		.enable("trust proxy")
		.use(middleware.cors)
		.use(middleware.securityHeaders)
		.use(middleware.bodyParser)
		.use(middleware.timeoutHandler)
		// mount point for routes
		.use(SERVER_CONFIG.rootPrefix, mountCounterRoutes())
		// post-ware
		.use(middleware.unusedRoutes)
		.use(middleware.errorHandler)
		.listen(SERVER_CONFIG.port, () => {
			console.log(`Server running :: ${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`);
		})
		.on("error", (error) => {
			console.error("SERVER ERROR ::", error);
			process.exit(1);
		});
};

startServer();
