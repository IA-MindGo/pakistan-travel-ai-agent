"""Root ASGI entrypoint for Render deployments from repository root.

This shim allows `uvicorn app.main:app` to work when the service root is the
repository root. By default it serves `managed-chatkit/backend/app/main.py`.
Set `BACKEND_TARGET=chatkit` to serve `chatkit/backend/app/main.py`.
You can override both with `BACKEND_APP_DIR`.
"""

from __future__ import annotations

import importlib.util
import os
import sys
from pathlib import Path
from types import ModuleType

ROOT_DIR = Path(__file__).resolve().parents[1]


def _resolve_backend_dir() -> Path:
    override = os.getenv("BACKEND_APP_DIR")
    if override:
        override_path = Path(override)
        return override_path if override_path.is_absolute() else ROOT_DIR / override_path

    target = (os.getenv("BACKEND_TARGET") or "managed").strip().lower()
    if target in {"managed", "managed-chatkit", "managed_chatkit"}:
        return ROOT_DIR / "managed-chatkit" / "backend"
    return ROOT_DIR / "chatkit" / "backend"


def _load_backend_module(module_path: Path) -> ModuleType:
    package_name = "render_backend_app"
    package_dir = module_path.parent

    package = ModuleType(package_name)
    package.__path__ = [str(package_dir)]  # type: ignore[attr-defined]
    sys.modules[package_name] = package

    spec = importlib.util.spec_from_file_location(f"{package_name}.main", module_path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Unable to load backend module from: {module_path}")

    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


backend_dir = _resolve_backend_dir()
backend_main = backend_dir / "app" / "main.py"

if not backend_main.exists():
    raise RuntimeError(
        "Backend app not found at "
        f"{backend_main}. Set BACKEND_APP_DIR to a valid backend directory."
    )

backend_module = _load_backend_module(backend_main)
app = getattr(backend_module, "app", None)

if app is None:
    raise RuntimeError(f"No 'app' object found in backend module: {backend_main}")
