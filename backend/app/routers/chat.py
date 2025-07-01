from fastapi import APIRouter, WebSocket, WebSocket, WebSocketDisconnect

from ..services import inference

router = APIRouter()

@router.websocket("/{exp_id}")
async def chat_websocket(websocket: WebSocket, exp_id:str):
    await websocket.accept()
    generator = inference.stream_chat(exp_id, websocket)
    try:
        async for _ in generator:
            pass
    except WebSocketDisconnect:
        await generator.aclose()

