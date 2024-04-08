import { app } from "./src/app/web.js";

const port = 3000;
const host = "localhost";

app.listen(port, host, () => {
	console.log(`run at http://${host}:${port}`);
});

app.get("/", (req, res) => {
	res.send("test");
});
