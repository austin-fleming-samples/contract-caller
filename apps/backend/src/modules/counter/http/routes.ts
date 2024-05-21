import { Router } from "express";
import { readCounterController } from "../usecases/read-counter/read-counter.controller";
import { writeCounterController } from "../usecases/write-counter/write-counter.controller";

export const mountCounterRoutes = () => {
	const app = Router();

	app.get("/read", readCounterController);
	app.post("/write", writeCounterController);

	return app;
};
