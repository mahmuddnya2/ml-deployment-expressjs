import tf from "@tensorflow/tfjs-node";
import { Firestore } from "@google-cloud/firestore";

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

		return { label, suggestion, confidenceScore };
	} catch (error) {
		console.log(error);
	}
};

const getPredict = async () => {
	const db = new Firestore({ databaseId: "predictions" });

	const collectionName = await db.collection("predictions").get();
	const data = collectionName.docs.map((doc) => {
		return { id: doc.id, history: doc.data() };
	});

	return data;
};

export default { predictClassification, getPredict };
