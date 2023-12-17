from fastapi import FastAPI, Request, Form
from fastapi.responses import RedirectResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import pytube as pt
from shazamio import Shazam
import requests
import os
from urllib.parse import urlparse, parse_qs

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


async def get_shazam_details(video_url: str) -> dict:
    yt = pt.YouTube(video_url, use_oauth=False)
    audio_stream = yt.streams.filter(only_audio=True)[0]
    audio_stream.download(filename="audio.mp3")

    shazam = Shazam()
    details = await shazam.recognize_song('audio.mp3')

    coverart = requests.get(details['track']['images']['coverart'])
    with open("static/media/coverart.jpg", "wb") as f:
        f.write(coverart.content)

    result = {
        "title": details['track']['title'],
        "subtitle": details['track']['subtitle'],
        "coverart": "static/media/coverart.jpg",
    }

    os.remove("audio.mp3")
    return result

@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/process_url")
async def process_url(url: str = Form(...)):
    video_id = ""
    try:
        parsed_url = urlparse(url)
        if 'v' in parse_qs(parsed_url.query):
            video_id = parse_qs(parsed_url.query)['v'][0]
        elif "/embed/" in url:
            video_id = url.split("/embed/")[1]
        elif "/shorts/" in url:
            video_id = url.split("/shorts/")[1]
        elif "youtu.be/" in url:
            video_id = url.split("youtu.be/")[1]
        else:
            return {"error": "URL not valid."}
    except Exception as e:
        return {"error": str(e)}

    return RedirectResponse(url=f"/detect?id={video_id}", status_code=303)

@app.get("/detect", response_class=HTMLResponse)
async def detect(request: Request, id: str):
    details = await get_shazam_details(f'https://youtu.be/{id}')

    print(details["coverart"])
    
    return templates.TemplateResponse("result.html", 
                                      {"request": request, 
                                       "title": details.get("title", ""), 
                                       "subtitle": details.get("subtitle", ""), 
                                       "coverart": details["coverart"]})


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
