const fs = require("fs");
const { getVideoMP3Base64 } = require("../src/getVideoMP3/getVideoMP3Base64");
const { getVideoMP3Binary } = require("../src/getVideoMP3/getVideoMP3Binary");
const { getVideoTitle } = require("../src/metadata/getVideoTitle");

// Base64 test
const music = getVideoMP3Base64("https://www.youtube.com/watch?v=TUVcZfQe-Kw")
music.then(mp3 => console.log(mp3)).catch(err => console.log(err));

// Binary test
const bin = getVideoMP3Binary("https://www.youtube.com/watch?v=TUVcZfQe-Kw");

bin.then(binary => {
    console.log(binary);
    fs.writeFileSync("test/song.mp3", binary.mp3);
});

// Video metadata - Title
const metadata = getVideoTitle("https://www.youtube.com/watch?v=TUVcZfQe-Kw");
metadata.then(data => console.log(data));