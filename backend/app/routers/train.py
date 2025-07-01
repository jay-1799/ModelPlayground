from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel

from ..services import trainer

router = APIRouter()

class TrainRequest(BaseModel):
    dataset_id: int
    model_name: str
    lora_r: int=8
    lora_alpha: int=16
    lora_dropout: float=0.05
    epochs: int=1
    batch_size: int=1

@router.post("/")
async def start_training(payload: TrainRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(trainer.run_training, payload)
    return {"status": "training started"}

