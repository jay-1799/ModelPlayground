from typing import Optional
from sqlalchemy.orm import Session

from ..models import (
    DatasetRecord,
    Experiment,
    DataSetRecordORM,
    ExperimentORM
)
from .db import SessionLocal

def _get_db() -> Session:
    return SessionLocal()

def add_dataset(record: DatasetRecord) -> DatasetRecord:
    with _get_db() as db:
        db_obj = DataSetRecordORM(
            name=record.name, path=record.path, created_at=record.created_at
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return DatasetRecord.from_orm(db_obj)




def list_datasets() -> list[DatasetRecord]:
    with _get_db() as db:
        records = db.query(DataSetRecordORM).all()
        return [DatasetRecord.from_orm(r) for r in records]


def get_dataset_path(dataset_id: int) -> str:
    with _get_db() as db:
        record: Optional[DataSetRecordORM] = db.get(DataSetRecordORM, dataset_id)
        if not record:
            raise ValueError(f"Dataset {dataset_id} not found")
        return record.path


def add_experiment(record: Experiment) -> Experiment:
    with _get_db() as db:
        db_obj = ExperimentORM(
            dataset_id=record.dataset_id,
            model_name=record.model_name,
            lora_r=record.lora_r,
            lora_alpha=record.lora_alpha,
            lora_dropout=record.lora_dropout,
            epochs=record.epochs,
            batch_size=record.batch_size,
            metrics=record.metrics,
            checkpoint_path=record.checkpoint_path,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return Experiment.from_orm(db_obj)


def update_experiment(exp_id: int, **kwargs) -> None:
    with _get_db() as db:
        exp: Optional[ExperimentORM] = db.get(ExperimentORM, exp_id)
        if not exp:
            raise ValueError(f"Experiment {exp_id} not found")
        for key, value in kwargs.items():
            setattr(exp,key,value)
        db.add(exp)
        db.commit()


def get_experiment(exp_id: int) -> Optional[Experiment]:
    with _get_db() as db:
        exp: Optional[ExperimentORM] = db.get(ExperimentORM, exp_id)
        return Experiment.from_orm(exp) if exp else None
