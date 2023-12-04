from fastapi import FastAPI, Form
from fastapi.responses import RedirectResponse
import pytube as pt
from shazamio import Shazam
import requests
import os
from urllib.parse import urlparse, parse_qs

app = FastAPI()

async def get_shazam_details(video_url: str) -> dict:
    yt = pt.YouTube(video_url, use_oauth=False)
    audio_stream = yt.streams.filter(only_audio=True)[0]
    audio_stream.download(filename="audio.mp3")

    shazam = Shazam()
    details = await shazam.recognize_song('audio.mp3')

    coverart = requests.get(details['track']['images']['coverart'])
    with open("coverart.jpg", "wb") as f:
        f.write(coverart.content)

    result = {
        "title": details['track']['title'],
        "subtitle": details['track']['subtitle'],
        "coverart_path": "coverart.jpg"
    }

    os.remove("audio.mp3")
    return result

@app.get("/")
async def home():
    url = input('Enter video URL: ')
    video_id = ""
    try:
        parsed_url = urlparse(url)
        video_id = parse_qs(parsed_url.query)['v'][0]
    except KeyError:
        if "/embed/" in url:
            video_id = url.split("/embed/")[1]
        elif "/shorts/" in url:
            video_id = url.split("/shorts/")[1]
        elif "youtu.be/" in url:
            video_id = url.split("youtu.be/")[1]
        else:
            print("URL not valid.")
    
    return RedirectResponse(f"/detect?id={video_id}")

@app.get("/detect")
async def detect(id: str):
    url = f'https://youtu.be/{id}'
    shazam_details = await get_shazam_details(url)
    return shazam_details

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
