from fastapi import FastAPI
from typing import Optional
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app.app:app", port=8000, reload=True)