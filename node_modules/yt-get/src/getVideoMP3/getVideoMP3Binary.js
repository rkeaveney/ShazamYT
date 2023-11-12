const ytdl = require("ytdl-core");
const { getVideoTitle } = require("../metadata/getVideoTitle");

async function getVideoMP3Binary(videoURL) {
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
				resolve({
                    mp3: buffer,
                    title: videoTitle,
                });
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
    getVideoMP3Binary,
}