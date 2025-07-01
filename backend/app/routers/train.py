from fastapi import APIRouter, BackgroundTasks

from ..services import trainer
from ..services.trainer import TrainRequest

router = APIRouter()


@router.post("/")
async def start_training(payload: TrainRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(trainer.run_training, payload)
    return {"status": "training started"}

