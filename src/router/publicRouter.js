import express from "express";
import predictController from "../controller/predictController.js";

const publicRouter = new express.Router();

publicRouter.get("/predict/histories", predictController.getPredict);

export { publicRouter };
