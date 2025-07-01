from pydantic import BaseModel

class DatasetRecord(BaseModel):
    id: int
    name: str
    path: str
    created_at: str

class Experiment(BaseModel):
    id: int
    dataset_id: int
    model_name: str
    lora_r: int
    lora_alpha: int
    lora_dropout: float
    epochs: int
    batch_size: int
    metrics: dict | None = None
    checkpoint_path: str | None = None


