# Director's Console Pinokio Launcher

This launcher runs **Director's Console** from `./app` with one click.

Director's Console combines:
- Cinema Prompt Engineering (CPE) API for cinematography-aware prompt creation
- Storyboard frontend UI
- Orchestrator API for multi-node render management

## How to use

1. Open this project in Pinokio.
2. Click `Install` once.
3. Click `Start`.
4. Open `Open Web UI` when it appears.

### Services started

- Frontend: `http://127.0.0.1:5173`
- CPE API: `http://127.0.0.1:9800`
- Orchestrator API: `http://127.0.0.1:9820`

## Programmatic API examples

### JavaScript (Node 18+)

```javascript
const cpeBase = "http://127.0.0.1:9800"
const orchestratorBase = "http://127.0.0.1:9820"

const health = await fetch(`${cpeBase}/api/health`).then((r) => r.json())
console.log("CPE health:", health)

const prompt = await fetch(`${cpeBase}/generate-prompt`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    project_type: "live_action",
    config: {},
    target_model: "generic"
  })
}).then((r) => r.json())
console.log("Prompt:", prompt.prompt)

const backends = await fetch(`${orchestratorBase}/api/backends`).then((r) => r.json())
console.log("Backends:", backends)
```

### Python

```python
import requests

cpe_base = "http://127.0.0.1:9800"
orchestrator_base = "http://127.0.0.1:9820"

health = requests.get(f"{cpe_base}/api/health", timeout=15).json()
print("CPE health:", health)

prompt = requests.post(
    f"{cpe_base}/generate-prompt",
    json={
        "project_type": "live_action",
        "config": {},
        "target_model": "generic"
    },
    timeout=30,
).json()
print("Prompt:", prompt.get("prompt"))

backends = requests.get(f"{orchestrator_base}/api/backends", timeout=15).json()
print("Backends:", backends)
```

### cURL

```bash
curl -s http://127.0.0.1:9800/api/health

curl -s http://127.0.0.1:9800/generate-prompt \
  -H 'Content-Type: application/json' \
  -d '{"project_type":"live_action","config":{},"target_model":"generic"}'

curl -s http://127.0.0.1:9820/api/backends
```
