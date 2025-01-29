from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from auth import router as auth_router
from tasks import router as tasks_router
from mood import router as mood_router
import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build

app = FastAPI()

app.include_router(auth_router)
app.include_router(tasks_router)
app.include_router(mood_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the API"}

#  Данные для Google Calendar API (замени своими)
SERVICE_ACCOUNT_FILE = "path/to/service-account.json"
SCOPES = ["https://www.googleapis.com/auth/calendar"]
credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)
calendar_service = build("calendar", "v3", credentials=credentials)

#  Модель данных для создания задачи
class Task(BaseModel):
    title: str
    description: str
    date: str  # YYYY-MM-DD
    time: str  # HH:MM
    user_email: str  # Почта для добавления в календарь

@app.post("/create_task/")
async def create_task(task: Task):
    """ Создает задачу и добавляет ее в Google Calendar. """
    event = {
        "summary": task.title,
        "description": task.description,
        "start": {
            "dateTime": f"{task.date}T{task.time}:00",
            "timeZone": "UTC",
        },
        "end": {
            "dateTime": f"{task.date}T{task.time}:00",
            "timeZone": "UTC",
        },
    }
    try:
        event = calendar_service.events().insert(calendarId="primary", body=event).execute()
        return {"message": "Task created successfully", "event_id": event.get("id")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

#  Модель настроения пользователя
class Mood(BaseModel):
    mood_level: int  # 1-5
    date: str  # YYYY-MM-DD

user_moods = {}

@app.post("/set_mood/")
async def set_mood(mood: Mood):
    """ Сохраняет настроение пользователя. """
    user_moods[mood.date] = mood.mood_level
    return {"message": "Mood saved", "mood": mood.mood_level}

@app.get("/get_mood/{date}")
async def get_mood(date: str):
    """ Получает настроение пользователя за определенную дату. """
    mood = user_moods.get(date)
    if mood is None:
        raise HTTPException(status_code=404, detail="No mood data found")
    return {"date": date, "mood": mood}
