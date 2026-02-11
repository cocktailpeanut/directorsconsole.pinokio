module.exports = {
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "venv",
        path: "app/Orchestrator",
        message: [
          "python -m uvicorn orchestrator.api:app --host 127.0.0.1 --port 9820"
        ],
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "venv",
        path: "app/CinemaPromptEngineering",
        message: [
          "python -m uvicorn api.main:app --host 127.0.0.1 --port 9800"
        ],
        on: [{
          event: "/(http:\\/\\/[0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/CinemaPromptEngineering/frontend",
        message: [
          "npm run dev -- --host 127.0.0.1 --port 5173"
        ],
        on: [{
          event: "/(http:\\/\\/[a-zA-Z0-9.:]+)/",
          done: true
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}"
      }
    }
  ]
}
