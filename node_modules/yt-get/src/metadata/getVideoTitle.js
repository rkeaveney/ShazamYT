const ytdl = require("ytdl-core");
const utils = require("./../utils");

async function getVideoTitle(videoURL) {
    try {
        const videoInfo = await ytdl.getInfo(videoURL);
        const videoTitle = utils.sanitizeFilename(videoInfo.videoDetails.title);
        return videoTitle;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getVideoTitle,
}