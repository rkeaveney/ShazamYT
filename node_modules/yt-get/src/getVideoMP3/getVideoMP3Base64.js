const { getVideoTitle } = require("../metadata/getVideoTitle");
const ytdl = require("ytdl-core");

async function getVideoMP3Base64(videoURL) {
	try {
		
        const videoTitle = await getVideoTitle(videoURL);

        return new Promise((resolve, reject) => {
            const audioStream = ytdl(videoURL, { filter: "audioonly" });
            const chunks = [];

            audioStream.on("data", (chunk) => {
                chunks.push(chunk);
            });

            audioStream.on("end", () => {
                const buffer = Buffer.concat(chunks);
                resolve({ base64: buffer.toString("base64"), title: videoTitle });
            });

            audioStream.on("error", (err) => {
                reject(err);
            });

        });
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
    getVideoMP3Base64,
};