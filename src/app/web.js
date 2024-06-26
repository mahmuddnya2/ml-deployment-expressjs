import express from "express";
import { publicRouter } from "../router/publicRouter.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

app.use(publicRouter);

app.use(errorMiddleware);

export { app };
