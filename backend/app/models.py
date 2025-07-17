from pydantic import BaseModel
from sqlalchemy import JSON, Column, Float, Integer, String

from ..services.db import Base

class DataSetRecordORM(Base):
    __table__name = "datasets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    path = Column(String, nullable=False)
    created_at = Column(String, nullable=False)


class DatasetRecord(BaseModel):
    id: int | None = None
    name: str
    path: str
    created_at: str

    class Config:
        orm_mode = True

class ExperimentORM(Base):
    __tablename__ = "experiments"
    id = Column(Integer, primary_key=True)
    dataset_id = Column(Integer,nullable=False)
    model_name = Column(String, nullable=False)
    lora_r = Column(Integer, nullable=False)
    lora_alpha = Column(Integer, nullable=False)
    lora_dropout = Column(Float, nullable=False)
    epochs = Column(Integer, nullable=False)
    batch_size = Column(Integer, nullable=False)
    metrics = Column(JSON)
    checkpoint_path = Column(String)



class Experiment(BaseModel):
    id: int | None = None
    dataset_id: int
    model_name: str
    lora_r: int
    lora_alpha: int
    lora_dropout: float
    epochs: int
    batch_size: int
    metrics: dict | None = None
    checkpoint_path: str | None = None

    class Config:
        orm_mode = True


