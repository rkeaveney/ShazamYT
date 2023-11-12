const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");
const utils = require("./../utils.js");

const OUTPUT_FOLDER = path.join(process.cwd(), "music");

// Functions
async function downloadPlaylist(playlistURL) {
	const videoURLS = await getPlaylistVideoURLS(playlistURL);

	for (const url of videoURLS) {
		try {
			await downloadVideo(url);
		} catch (error) {
			console.error(`Error downloading video: ${url}`, error);
			continue;
		}
	}
}

async function getPlaylistVideoURLS(playlistURL) {
	try {
		const playlist = await ytpl(playlistURL);
		return playlist.items.map((video) => video.url);
	} catch (error) {
		throw new Error("An error occurred getting the playlist:" + error);
	}
}

async function downloadVideo(videoURL) {
	try {
		const videoInfo = await ytdl.getInfo(videoURL);
		const videoTitle = utils.sanitizeFilename(videoInfo.videoDetails.title);

		utils.createOutputFolder(OUTPUT_FOLDER);

		const outputFilePath = path.join(OUTPUT_FOLDER, `${videoTitle}.mp3`);

		ytdl(videoURL, { filter: "audioonly" })
			.pipe(fs.createWriteStream(outputFilePath))
			.on("finish", () => {
				console.log("Downloaded " + videoTitle);
			});
	} catch (error) {
		console.error(error);
	}
}

// Lib Exports
module.exports = {
	downloadPlaylist,
	downloadVideo,
};
