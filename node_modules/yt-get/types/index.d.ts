declare module "yt-get" {
    function getVideoMP3Base64(videoURL: string): Promise<{ base64: string, title: string }>;
    function getVideoMP3Binary(videoURL: string): Promise<{ mp3: Buffer, title: string }>;
    function downloadVideo(videoURL: string): Promise<void>;
    function downloadPlaylist(playlistURL: string): Promise<void>;
    function getVideoTitle(videoURL: string): string;
}