from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI()

# Модель данных для задачи
class Task(BaseModel):
    id: Optional[str] = None  # Делаем id необязательным
    title: str
    description: Optional[str] = None
    completed: bool = False

tasks = {}

# Создание задачи
@app.post("/tasks/", response_model=Task)
async def create_task(task: Task):
    task.id = str(uuid.uuid4())  # Генерация уникального id
    tasks[task.id] = task
    return task

# Чтение всех задач
@app.get("/tasks/", response_model=List[Task])
async def get_tasks():
    return list(tasks.values())

# Чтение одной задачи
@app.get("/tasks/{task_id}", response_model=Task)
async def get_task(task_id: str):
    task = tasks.get(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# Обновление задачи
@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: str, updated_task: Task):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    tasks[task_id].title = updated_task.title
    tasks[task_id].description = updated_task.description
    tasks[task_id].completed = updated_task.completed
    return tasks[task_id]

# Удаление задачи
@app.delete("/tasks/{task_id}")
async def delete_task(task_id: str):
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    del tasks[task_id]
    return {"message": "Task deleted successfully"}
