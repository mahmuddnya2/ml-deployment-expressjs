import express from "express";
import predictController from "../controller/predictController.js";
import { fileHandler } from "../app/fileHandler.js";
import { errorMulterHandler } from "../error/errorMulterHandler.js";

const publicRouter = new express.Router();

publicRouter.get("/predict/histories", predictController.getPredict);

publicRouter.use(fileHandler);
publicRouter.use(errorMulterHandler);
publicRouter.post("/predict", predictController.predict);

export { publicRouter };
