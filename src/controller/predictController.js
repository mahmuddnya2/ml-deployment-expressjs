import predictService from "../service/predictService.js";

const predict = async (req, res, next) => {
	try {
		const image = req.file;
	} catch (error) {}
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
