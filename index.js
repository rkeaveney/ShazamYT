import bodyParser from "body-parser";
import express from "express";
import { url } from "inspector";
import { dirname } from "path";
import { title } from "process";
import { fileURLToPath } from "url";
import * as fs from "fs";
import { getVideoMP3Base64 } from "yt-get";
import ytdl from "ytdl-core";
import axios from "axios";

const app = express();
const port = 8000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res) => {
    res.render(__dirname + "/public/index.ejs");
});

app.post("/detect", async (req,res) => {
    try {
        let videoURL = req.body.url;
        let videoID = ytdl.getURLVideoID(videoURL);

        const mp3_result = await getVideoMP3Base64(videoURL);
        const data_b64 = mp3_result.base64;
        const videoTitle = mp3_result.title;

        console.log(data_b64);
        console.log(videoTitle);

        const options = {
            method: 'POST',
            url: 'https://shazam.p.rapidapi.com/songs/v2/detect',
            params: {
                timezone: 'Europe/Dublin',
                locale: 'en-IE'
            },
            headers: {
                'content-type': 'text/plain',
                'X-RapidAPI-Key': 'b3ce16ef19msh19862eb5f29d401p119962jsn5899845358a6',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            },
            data: data_b64,
        };

        const response = await axios.request(options);
        console.log(response);
        console.log(response.data);

        res.status(200).send("Success!");
    }
    catch (error) {
        console.error("Failed to complete request. Error:", error);
        res.status(500).send("Failed to complete request.");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
});