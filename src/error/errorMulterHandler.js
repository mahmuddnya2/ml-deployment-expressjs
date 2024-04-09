import multer from "multer";

const errorMulterHandler = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		const message = {
			status: "fail",
			message: "Payload content length greater than maximum allowed: 1000000",
		};
		return res.status(413).json(message);
	}
};

export { errorMulterHandler };
