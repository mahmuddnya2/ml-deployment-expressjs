import multer from "multer";

const maxSize = 1024 * 1024;

const fileHandler = multer({
	limits: { fileSize: maxSize },
}).single("image");

export { fileHandler };
