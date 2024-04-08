import express from "express";
import { publicRouter } from "../router/publicRouter.js";

const app = express();

app.use(express.json());

app.use(publicRouter);

export { app };
