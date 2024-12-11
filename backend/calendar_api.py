from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from googleapiclient.discovery import build
from google.oauth2 import service_account
import datetime

app = FastAPI()

SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = 'credentials.json'  # путь к вашему credentials.json

# Настройка подключения к API Google Calendar
def get_calendar_service():
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES
    )
    service = build('calendar', 'v3', credentials=creds)
    return service

# Модель для событий календаря
class Event(BaseModel):
    summary: str
    location: str = "Online"
    description: str = ""
    start: datetime.datetime
    end: datetime.datetime

# Эндпоинт для создания события
@app.post("/create_event/")
async def create_event(event: Event):
    service = get_calendar_service()
    event_body = {
        'summary': event.summary,
        'location': event.location,
        'description': event.description,
        'start': {'dateTime': event.start.isoformat(), 'timeZone': 'UTC'},
        'end': {'dateTime': event.end.isoformat(), 'timeZone': 'UTC'}
    }
    created_event = service.events().insert(calendarId='primary', body=event_body).execute()
    return {"status": "Event created", "htmlLink": created_event.get("htmlLink")}
