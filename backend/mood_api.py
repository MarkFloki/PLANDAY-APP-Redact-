from fastapi import APIRouter, HTTPException
from models import Mood
from database import execute_query, fetch_query

router = APIRouter()

@router.post("/mood/")
async def set_mood(mood: Mood):
    """Сохраняет настроение."""
    execute_query("INSERT INTO moods (date, mood_level) VALUES (?, ?)", (mood.date, mood.mood_level))
    return {"message": "Mood saved"}

@router.get("/mood/{date}")
async def get_mood(date: str):
    """Получает настроение по дате."""
    mood = fetch_query("SELECT mood_level FROM moods WHERE date = ?", (date,))
    if not mood:
        raise HTTPException(status_code=404, detail="No mood data found")
    return {"date": date, "mood": mood[0][0]}
