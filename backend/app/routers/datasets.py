from datetime import datetime
from fastapi import APIRouter, UploadFile, File

from ..services import storage, persistence
from ..models import DatasetRecord

router = APIRouter()

_dataset_id_seq = 1


@router.post("/")
async def upload_dataset(file: UploadFile = File(...)) ->  DatasetRecord:
    global _dataset_id_seq
    path = storage.save_dataset(file.file, file.filename)
    record = DatasetRecord(
        id = _dataset_id_seq,
        name = file.filename,
        path = path,
        created_at = datetime.utcnow().isoformat(),
    )
    _dataset_id_seq += 1
    persistence.add_dataset(record)
    return record

@router.get("/", response_model=list[DatasetRecord])
async def list_datasets() -> list[DatasetRecord]:
    """Return all uploaded dataset records"""
    return persistence.list_datasets()
