from fastapi import FastAPI
from .routers import train, chat, dataset

app = FastAPI(title="Model Playground")

app.include_router(train.router, prefix="/train", tags=["train"])
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(dataset.router, prefix='datasets', tags=["datasets"])

app.get("/")
async def root():
    return {"message": "ModelPlayground backend"}
