import speech_recognition as sr
from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.post("/voice_to_text/")
async def voice_to_text(audio: UploadFile = File(...)):
    """ Преобразует голос в текст. """
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio.file) as source:
        audio_data = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio_data, language="ru-RU")
        return {"text": text}
    except sr.UnknownValueError:
        return {"error": "Speech could not be understood"}
    except sr.RequestError:
        return {"error": "Error with speech recognition service"}
