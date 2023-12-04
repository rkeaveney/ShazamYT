from fastapi import FastAPI, Form
from fastapi.responses import RedirectResponse
import pytube as pt
from shazamio import Shazam
import requests
import os

app = FastAPI()

async def get_shazam_details(video_url: str) -> dict:
    yt = pt.YouTube(video_url, use_oauth=False)
    audio_stream = yt.streams.filter(only_audio=True)[0]
    audio_stream.download(filename="song.mp3")

    shazam = Shazam()
    details = await shazam.recognize_song('song.mp3')

    response = requests.get(details['track']['images']['coverart'])
    with open("coverart.jpg", "wb") as f:
        f.write(response.content)

    result = {
        "title": details['track']['title'],
        "subtitle": details['track']['subtitle'],
        "coverart_path": "coverart.jpg"
    }

    os.remove("song.mp3")
    return result

@app.get("/")
async def home():
    id = input('Enter video ID: ')
    return RedirectResponse(id=f"/detect?url={id}")

@app.get("/detect")
async def detect(id: str):
    url = f'https://www.youtube.com/watch?v={id}'
    shazam_details = await get_shazam_details(url)
    return shazam_details

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
