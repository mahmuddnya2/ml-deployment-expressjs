import tf from "@tensorflow/tfjs-node";
import dotenv from "dotenv";
import __dirname from "./dirname.js";

dotenv.config({ path: `${__dirname}/../../.env` });

const loadModel = async () => {
	return tf.loadGraphModel(process.env.MODEL_URL);
};

export { loadModel };
