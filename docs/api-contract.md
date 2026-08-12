# ReadmePilot — API Contract

## Base URL

Development:

http://localhost:4000

---

## Health Check

### Request

GET /health

### Response

```json
{
  "status": "ok",
  "service": "readmepilot-api"
}
```

---

## Analyze Repository

### Request

POST /api/analyze

### Body

```json
{
  "repoUrl": "https://github.com/vercel/next.js"
}
```

### Success Response

```json
{
  "name": "next.js",
  "framework": "Next.js",
  "packageManager": "npm",
  "languages": ["TypeScript", "JavaScript"],
  "envVariables": ["DATABASE_URL"],
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

---

## Generate Documentation

### Request

POST /api/generate

### Body

```json
{
  "repoUrl": "https://github.com/vercel/next.js"
}
```

### Response

```json
{
  "readme": "# Project...",
  "installation": "## Installation...",
  "environment": "| Variable | Description |",
  "deployment": "## Deployment...",
  "apiDocs": "## API Endpoints..."
}
```

---

## Error Format

All errors should return:

```json
{
  "error": {
    "message": "Invalid GitHub repository URL",
    "code": "INVALID_REPO_URL"
  }
}
```