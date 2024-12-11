import os
import datetime
from google.oauth2 import service_account
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
# pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client необходимая библеотека

# Определите область доступа
SCOPES = ['https://www.googleapis.com/auth/calendar'] #пока неработает

def authenticate_google():
# Аутентификация с использованием файла credentials.json
creds = None
if os.path.exists('token.json'):
creds = service_account.Credentials.from_service_account_file(
'credentials.json', scopes=SCOPES)
else:
flow = InstalledAppFlow.from_client_secrets_file(
'credentials.json', SCOPES)
creds = flow.run_local_server(port=0)
with open('token.json', 'w') as token:
token.write(creds.to_json())
return creds

def get_calendar_service():
creds = authenticate_google()
service = build('calendar', 'v3', credentials=creds)
return service

def create_event():
service = get_calendar_service()
event = {
'summary': 'Тестовое событие',
'location': 'Онлайн',
'description': 'Пример добавления события через Google Calendar API.',
'start': {
'dateTime': '2024-11-15T09:00:00-07:00',
'timeZone': 'America/Los_Angeles',
},
'end': {
'dateTime': '2024-11-15T17:00:00-07:00',
'timeZone': 'America/Los_Angeles',
},
'reminders': {
'useDefault': False,
'overrides': [
{'method': 'email', 'minutes': 24 * 60},
{'method': 'popup', 'minutes': 10},
],
},
}

event = service.events().insert(calendarId='primary', body=event).execute()
print(f'Событие создано: {event.get("htmlLink")}')

if __name__ == '__main__':
create_event()
