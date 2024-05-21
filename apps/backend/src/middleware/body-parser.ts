import express = require("express");
import type { RequestHandler } from "express";

export const bodyParser: RequestHandler = (request, response, next) =>
	express.json()(request, response, next);
