# OpenAI ChatKit Starter Templates

This repository contains two starter apps as reference implementations of minimal ChatKit integrations.

You can run the following examples:

- [**ChatKit**](chatkit) - example of a self-hosted ChatKit integration.
- [**Managed ChatKit**](managed-chatkit) – example of a managed ChatKit integration with hosted workflows.

## Render (repository-root deploy)

If your Render service deploys from the repository root, use:

- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

By default this starts the ChatKit backend. To start Managed ChatKit instead,
set `BACKEND_TARGET=managed` in Render environment variables.
