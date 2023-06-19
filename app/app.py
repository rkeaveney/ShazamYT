from fastapi import FastAPI
import pytube as pt
import nest_asyncio
import asyncio
from shazamio import Shazam
nest_asyncio.apply()
app = FastAPI()

async def main(filename):
  shazam = Shazam()
  out = await shazam.recognize_song(filename)
  return out

@app.get("/shazam")
async def get_details(url: str) -> dict:
    yt = pt.YouTube(url)
    t = yt.streams.filter(only_audio=True)
    t[0].download(filename="file.mp3")
    loop = asyncio.get_event_loop()
    details = loop.run_until_complete(main('file.mp3'))
    return {
            'title': details['track']['title'],
            'artist': details['track']['subtitle']
            }