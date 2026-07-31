"""FastAPI entrypoint for the ChatKit starter backend."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any, Mapping

from chatkit.server import StreamingResult
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response, StreamingResponse
from openai import AsyncOpenAI

from .server import StarterChatServer

app = FastAPI(title="ChatKit Starter API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chatkit_server = StarterChatServer()


def load_environment_from_path(path: str | os.PathLike[str] | None = None) -> bool:
    """Populate environment variables from local .env files if present."""
    candidates = []
    if path is not None:
        candidates.append(Path(path))

    base_dir = Path(__file__).resolve().parents[1]
    candidates.extend(
        [
            base_dir / ".env.local",
            base_dir / ".env",
            base_dir.parent / ".env.local",
            base_dir.parent / ".env",
        ]
    )

    loaded = False
    seen: set[Path] = set()
    for candidate in candidates:
        path_obj = Path(candidate)
        if path_obj in seen or not path_obj.exists():
            continue
        seen.add(path_obj)

        for line in path_obj.read_text(encoding="utf-8").splitlines():
            stripped = line.strip()
            if not stripped or stripped.startswith("#"):
                continue
            if stripped.startswith("export "):
                stripped = stripped[len("export ") :].strip()
            if "=" not in stripped:
                continue

            key, value = stripped.split("=", 1)
            key = key.strip()
            value = value.strip()
            if not key:
                continue
            if value and value[0] == value[-1] and value[0] in {'"', "'"}:
                value = value[1:-1]

            os.environ.setdefault(key, value)
            loaded = True

    return loaded


load_environment_from_path()
openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


@app.post("/chatkit")
async def chatkit_endpoint(request: Request) -> Response:
    """Proxy the ChatKit web component payload to the server implementation."""
    payload = await request.body()
    result = await chatkit_server.process(payload, {"request": request})

    if isinstance(result, StreamingResult):
        return StreamingResponse(result, media_type="text/event-stream")
    if hasattr(result, "json"):
        return Response(content=result.json, media_type="application/json")
    return JSONResponse(result)


@app.post("/api/chat")
async def chat_reply(request: Request) -> JSONResponse:
    """Simple JSON chat endpoint for custom frontends."""
    if not os.getenv("OPENAI_API_KEY"):
        return JSONResponse(
            {"error": "Missing OPENAI_API_KEY environment variable"},
            status_code=500,
        )

    body = await request.json()
    message = body.get("message") if isinstance(body, Mapping) else None
    if not isinstance(message, str) or not message.strip():
        return JSONResponse({"error": "Missing message"}, status_code=400)

    history = body.get("history") if isinstance(body, Mapping) else None
    prompt_parts: list[str] = [
        "You are Pakistan Travel AI, a practical and friendly Pakistan travel planner.",
        "Give concise and useful answers with specific destinations, travel tips, and budget-aware suggestions when relevant.",
    ]

    if isinstance(history, list):
        for item in history[-10:]:
            if not isinstance(item, Mapping):
                continue
            role = item.get("role")
            content = item.get("content")
            if isinstance(role, str) and isinstance(content, str) and content.strip():
                prompt_parts.append(f"{role}: {content.strip()}")
    else:
        prompt_parts.append(f"user: {message.strip()}")

    try:
        completion = await openai_client.responses.create(
            model="gpt-4.1-mini",
            input="\n".join(prompt_parts),
        )
    except Exception as error:
        return JSONResponse(
            {"error": f"OpenAI request failed: {error}"},
            status_code=502,
        )

    reply = getattr(completion, "output_text", None)
    if not isinstance(reply, str) or not reply.strip():
        return JSONResponse(
            {"error": "Model returned an empty response"},
            status_code=502,
        )

    return JSONResponse({"reply": reply.strip()})
