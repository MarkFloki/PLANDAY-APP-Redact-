import os
from google.oauth2 import service_account
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import datetime

# pip install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
# Убедитесь, что библиотеки установлены перед выполнением

# Определите область доступа
SCOPES = ['https://www.googleapis.com/auth/calendar']

def authenticate_google():
    """Аутентификация с использованием файла credentials.json"""
    creds = None
    if os.path.exists('token.json'):
        # Используем существующий токен
        creds = service_account.Credentials.from_service_account_file(
            'credentials.json', scopes=SCOPES
        )
    else:
        # Если токена нет, запускаем OAuth 2.0 процесс
        flow = InstalledAppFlow.from_client_secrets_file(
            'credentials.json', SCOPES
        )
        creds = flow.run_local_server(port=0)
        # Сохраняем токен для будущего использования
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    return creds

def get_calendar_service():
    """Получить объект службы Google Calendar"""
    creds = authenticate_google()
    try:
        service = build('calendar', 'v3', credentials=creds)
        return service
    except HttpError as error:
        print(f'Ошибка подключения к Google Calendar API: {error}')
        return None

def create_event():
    """Создать событие в Google Calendar"""
    service = get_calendar_service()
    if not service:
        print("Сервис недоступен. Проверьте аутентификацию.")
        return

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

    try:
        event = service.events().insert(calendarId='primary', body=event).execute()
        print(f'Событие создано: {event.get("htmlLink")}')
    except HttpError as error:
        print(f'Ошибка при создании события: {error}')

if __name__ == '__main__':
    create_event()
