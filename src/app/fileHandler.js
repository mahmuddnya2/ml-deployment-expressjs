import multer from "multer";
import { v4 as uuid } from "uuid";

const TYPE_IMAGE = {
	"image/jpeg": "jpeg",
	"image/png": "png",
	"image/jpg": "jpg",
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "");
	},
	filename: (req, file, cb) => {
		const fileName = uuid().toString();
		const ext = TYPE_IMAGE[file.mimetype];
		cb(null, `${fileName}.${ext}`);
	},
});

const imageFilter = (req, file, cb) => {
	const acceptFile = Object.keys(TYPE_IMAGE);

	if (!acceptFile) {
		cb({ message: "FIle not accept" }, false);
	} else {
		cb(null, true);
	}
};

const maxSize = 1024 * 1024;

const fileHandler = multer({
	storage,
	fileFilter,
	limits: { fileSize: maxSize },
}).single("image");

export { fileHandler };
