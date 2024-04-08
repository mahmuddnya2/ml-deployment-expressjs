import { loadModel } from "./src/app/loadModel.js";
import { app } from "./src/app/web.js";

const port = 3000;
const host = "localhost";

const initModel = async () => {
	const model = await loadModel();
	return model;
};

app.set("model", await initModel());

app.listen(port, host, () => {
	console.log(`run at http://${host}:${port}`);
});

app.get("/", (req, res) => {
	res.send("test");
});
