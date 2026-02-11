module.exports = {
  run: [
    {
      when: "{{!exists('app')}}",
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/NickPittas/DirectorsConsole.git app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "venv",
        path: "app/Orchestrator",
        message: [
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "venv",
        path: "app/CinemaPromptEngineering",
        message: [
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/CinemaPromptEngineering/frontend",
        message: [
          "npm install"
        ]
      }
    }
  ]
}
