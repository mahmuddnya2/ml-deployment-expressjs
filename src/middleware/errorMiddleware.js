import { ErrorHandler } from "../error/errorHandler.js";

export const errorMiddleware = (err, req, res, next) => {
	if (!err) {
		next();
		return;
	}

	if (err instanceof ErrorHandler) {
		res
			.status(err.status)
			.json({
				status: "fail",
				message: err.message,
			})
			.emd();
	} else {
		res
			.status(500)
			.json({
				status: "fail",
				message: err.message,
			})
			.end();
	}
};
