import predictService from "../service/predictService.js";
import { app } from "../app/web.js";

const predict = async (req, res, next) => {
	try {
		const image = req.file;
		const model = app.get("model");

		const result = await predictService.predictClassification(
			model,
			image.buffer
		);

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

const getPredict = async (req, res, next) => {
	try {
		const result = await predictService.getPredict();
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export default { getPredict, predict };
