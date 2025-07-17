from typing import AsyncGenerator

async def stream_chat(exp_id: str, websocket) -> AsyncGenerator[None, None]:
#    echo messages back to the websocket client
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Echo: {data}")
            yield None
    finally:
        await websocket.close()