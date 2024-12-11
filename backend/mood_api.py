from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import datetime

app = FastAPI()

class Mood(BaseModel):
    date: datetime.date
    mood_level: int  # Например, от 1 до 5

moods = []

@app.post("/mood/")
async def add_mood(mood: Mood):
    moods.append(mood)
    return mood

@app.get("/mood/", response_model=List[Mood])
async def get_moods():
    return moods
