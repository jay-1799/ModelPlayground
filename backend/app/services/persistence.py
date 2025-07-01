from typing import Dict
from ..models import DatasetRecord, Experiment

DATASETS: Dict[int, DatasetRecord] = {}
EXPERIMENTS: Dict[int, Experiment] = {}

def add_dataset(record: DatasetRecord) -> None:
    DATASETS[record.id] = record

def get_dataset_path(dataset_id: int) -> str:
    record = DATASETS.get(dataset_id)
    if not record:
        raise ValueError(f"Dataset {dataset_id} not found")
    return record.path

def add_experiment(record: Experiment) -> None:
    EXPERIMENTS[record.id] = record


def update_experiment(exp_id: int, **kwargs) -> None:
    exp = EXPERIMENTS.get(exp_id)
    if not exp:
        raise ValueError(f"Experiment {exp_id} not found")
    data = exp.dict()
    data.update(kwargs)
    EXPERIMENTS[exp_id] = Experiment(**data)


def get_experiment(exp_id: int) -> Experiment:
    return EXPERIMENTS.get(exp_id)