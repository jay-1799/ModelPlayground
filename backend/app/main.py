from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from .routers import train, chat, datasets

app = FastAPI(title="Model Playground")

origins = [
    # "http://localhost:5173"
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


api_router = APIRouter(prefix="/api")

api_router.include_router(train.router, prefix="/train", tags=["train"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(datasets.router, prefix="/datasets", tags=["datasets"])

app.include_router(api_router)

app.get("/")
async def root():
    return {"message": "ModelPlayground backend"}
