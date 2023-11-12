import bodyParser from "body-parser";
import express from "express";
import { url } from "inspector";
import { dirname } from "path";
import { title } from "process";
import { fileURLToPath } from "url";
import * as fs from "fs";
import { getVideoMP3Base64 } from "yt-get";
import ytdl from "ytdl-core";

const app = express();
const port = 8000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render(__dirname + "/public/index.ejs");
});

app.post("/detect", (req,res) => {
    let videoURL = req.body.url;
    let videoID = ytdl.getURLVideoID(videoURL);

    getVideoMP3Base64(videoURL)
        .then((result) => {
            const base64 = result.base64;
            const title = result.title;
            console.log("Base64-encoded MP3:", base64);
            console.log("Video Title:", title);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    res.render(__dirname + "/public/result.ejs", 
        { 
            "url": videoURL, 
            "id": videoID,
        });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});