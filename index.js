import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 8000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render(__dirname + "/public/index.ejs");
});

app.post("/detect", (req,res) => {
    console.log(req.body);
    res.render(__dirname + "/public/result.ejs", { "body": req.body });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});