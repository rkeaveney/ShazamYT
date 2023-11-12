# yt-get

A concise library for downloading MP3 data from YouTube videos and playlists.

---

## Instalation
To use this function, you need to have Node.js installed on your machine. You also need to install the `yt-get` library. You can install it by running the following command in your terminal:
```shell
npm install yt-get
```

---

## API

### .getVideoTitle(videoURL)
This function takes a 'videoURL' as input and returns the title of the YouTube video as a sanitized filename.
##### Parameters
- videoURL (string): The URL of the YouTube video.
##### Returns
- A Promise that resolves to the video title as a sanitized filename.
#### Example
```node
const videoURL = "https://www.youtube.com/watch?v=VIDEO_ID";

getVideoTitle(videoURL)
    .then((videoTitle) => {
        console.log("Video Title:", videoTitle);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```

### .getVideoMP3Base64(videoURL)
This function takes a videoURL as input and returns a Promise that resolves to an object containing the base64-encoded MP3 audio and the title of the YouTube video.
##### Parameters
- videoURL (string): The URL of the YouTube video.
##### Returns
- A Promise that resolves to the video title as a sanitized filename.
    - base64 (string): The base64-encoded MP3 audio.
    - title (string): The title of the YouTube video.
#### Example
```node
const videoURL = "https://www.youtube.com/watch?v=VIDEO_ID";

getVideoMP3Base64(videoURL)
    .then((result) => {
        const { base64, title } = result;
        console.log("Video Title:", title);
        console.log("Base64-encoded MP3:", base64);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```

### .getVideoMP3Binary(videoURL)
This function takes a videoURL as input and returns a Promise that resolves to an object containing the binary data of the MP3 audio and the title of the YouTube video.
##### Parameters
- videoURL (string): The URL of the YouTube video.
##### Returns
- A Promise that resolves to the video title as a sanitized filename.
    - mp3 (Buffer): The binary data of the MP3 audio.
    - title (string): The title of the YouTube video.
#### Example
```node
const videoURL = "https://www.youtube.com/watch?v=VIDEO_ID";

getVideoMP3Binary(videoURL)
    .then((result) => {
        const { mp3, title } = result;
        console.log("Video Title:", title);
        // Use the `mp3` Buffer as needed.
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```

### .downloadPlaylist(playlistURL)
This function takes a playlistURL as input and downloads all the videos from the YouTube playlist.
##### Parameters
- playlistURL (string): The URL of the YouTube playlist.
##### Returns
- (void): the function dowload the files into a folder in the directory where its called.
#### Example
```node
const playlistURL = "https://www.youtube.com/playlist?list=PLAYLIST_ID";

downloadPlaylist(playlistURL)
    .then(() => {
        console.log("Playlist downloaded successfully.");
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```

### .downloadVideo(videoURL)
This function takes a videoURL as input and downloads the audio data from the Youtube video.
##### Parameters
- playlistURL (string): The URL of the YouTube playlist.
##### Returns
- (void): the function download the file into a folder in the directory where its called.
#### Example
```node
const videoURL = "https://www.youtube.com/watch?v=VIDEO_ID";

downloadVideo(videoURL)
    .then(() => {
        console.log("Video downloaded successfully.");
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```