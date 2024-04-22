import tf from "@tensorflow/tfjs-node";
import { Firestore } from "@google-cloud/firestore";
import crypto from "crypto";
import { ErrorHandler } from "../error/errorHandler.js";

const db = new Firestore({ databaseId: "predictions" });

const storeData = async (id, data) => {
	const predictCollection = db.collection("predictions");
	return predictCollection.doc(id).set(data);
};

const predictClassification = async (model, image) => {
	try {
		const tensor = tf.node
			.decodeJpeg(image)
			.resizeNearestNeighbor([224, 224])
			.expandDims()
			.toFloat();

		const prediction = model.predict(tensor);
		const score = await prediction.data();
		const confidenceScore = Math.max(...score) * 100;

		let suggestion, label;

		if (confidenceScore > 50) {
			label = "Cancer";
			suggestion = "Segera berobat ke dokter";
		} else {
			label = "Not Cancer";
			suggestion = "Selamat bukan cancer";
		}

		const id = crypto.randomUUID();
		const createAt = new Date().toISOString();

		const data = {
			id,
			result: label,
			suggestion,
			createAt,
		};

		await storeData(id, data);

		const message =
			confidenceScore > 50
				? "Model is predicted successfully"
				: "Model is predicted successfully but under threshold. Please use the correct picture";

		return {
			status: "success",
			message,
			data,
		};
	} catch (error) {
		throw new ErrorHandler(400, "Terjadi kesalahan dalam melakukan prediksi");
	}
};

const getPredict = async () => {
	const collectionName = await db.collection("predictions").get();
	const data = collectionName.docs.map((doc) => {
		return { id: doc.id, history: doc.data() };
	});

	return {
		status: "success",
		data,
	};
};

export default { predictClassification, getPredict };
