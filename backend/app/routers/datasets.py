from datetime import datetime
from fastapi import APIRouter, UploadFile, File

from ..services import storage, persistence
from ..models import DatasetRecord

router = APIRouter()



@router.post("/", response_model = DatasetRecord)
async def upload_dataset(file: UploadFile = File(...)) -> DatasetRecord:
    path = storage.save_dataset(file.file, file.filename)
    record = DatasetRecord(
        name=file.filename,
        path = path,
        created_at=datetime.utcnow().isoformat(),
    )
    return persistence.add_dataset(record)

@router.get("/", response_model=list[DatasetRecord])
async def list_datasets() -> list[DatasetRecord]:
    """Return all uploaded dataset records"""
    return persistence.list_datasets()
