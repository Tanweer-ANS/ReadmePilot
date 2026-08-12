# ReadmePilot — Repository Analysis Specification

## Goal

Convert a GitHub repository into structured metadata that can be used by the AI documentation generator.

---

## Input

GitHub repository URL

Example:

https://github.com/vercel/next.js

---

## Data Sources

### Repository Metadata

- name
- description
- default branch
- stars
- primary language

### File Tree

Important files to inspect:

- package.json
- pnpm-lock.yaml
- yarn.lock
- package-lock.json
- Dockerfile
- docker-compose.yml
- .env.example
- .env.sample
- vercel.json
- render.yaml
- railway.json

---

## Framework Detection

### Next.js

Indicators:

- dependency: next
- next.config.js
- app/ directory

### React

Indicators:

- dependency: react
- vite.config.ts

### Express

Indicators:

- dependency: express
- src/routes directory

### FastAPI

Indicators:

- dependency: fastapi
- main.py containing FastAPI()

---

## Package Manager Detection

| File | Package Manager |
|------|-----------------|
| pnpm-lock.yaml | pnpm |
| yarn.lock | yarn |
| package-lock.json | npm |

---

## Environment Variable Extraction

Extract variable names from:

```env
DATABASE_URL=
JWT_SECRET=
SUPABASE_URL=
```

Output only the variable names.

---

## Deployment Detection

### Vercel

- vercel.json
- next.config.js

### Docker

- Dockerfile
- docker-compose.yml

### Render

- render.yaml

### Railway

- railway.json

---

## Final Output Shape

```json
{
  "repository": {
    "name": "flowgrid",
    "description": "Workflow automation platform"
  },
  "framework": "Next.js",
  "packageManager": "npm",
  "languages": ["TypeScript"],
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  },
  "envVariables": [
    "DATABASE_URL",
    "NEXTAUTH_SECRET"
  ],
  "deploymentTargets": [
    "Vercel",
    "Docker"
  ]
}
```