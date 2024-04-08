import express from "express";
import predictController from "../controller/predictController.js";
import { fileHandler } from "../app/fileHandler.js";

const publicRouter = new express.Router();

publicRouter.get("/predict/histories", predictController.getPredict);

publicRouter.use(fileHandler);
publicRouter.post("/predict", predictController.predict);

export { publicRouter };
