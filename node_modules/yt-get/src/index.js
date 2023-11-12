const { getVideoMP3Base64 } = require("./getVideoMP3/getVideoMP3Base64");
const { getVideoMP3Binary } = require("./getVideoMP3/getVideoMP3Binary");
const { downloadPlaylist, downloadVideo } = require("./downloads/downloads");
const { getVideoTitle } = require("./metadata/getVideoTitle");

module.exports = {
    getVideoMP3Binary,
    getVideoMP3Base64,
    downloadVideo,
    downloadPlaylist,
    getVideoTitle,
}