from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import hashlib

app = FastAPI()

# Simulated in-memory database
users_db = {}

# User model
class User(BaseModel):
    username: str
    password: str

@app.post("/register")
async def register(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    # Hash the password for security
    hashed_password = hashlib.sha256(user.password.encode()).hexdigest()
    users_db[user.username] = hashed_password
    return {"message": "Registration successful"}
