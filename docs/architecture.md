# ReadmePilot — System Architecture

## Overview

ReadmePilot is an AI-powered GitHub documentation generator that analyzes a public repository and produces professional documentation automatically.

## High-Level Flow

User
  ↓
Next.js Frontend
  ↓
Express API
  ↓
GitHub API
  ↓
Repository Analyzer
  ↓
Ollama AI Engine
  ↓
Markdown Generator
  ↓
Frontend Preview

## Frontend (apps/web)

Responsibilities:

- Accept GitHub repository URL
- Show loading progress
- Display generated Markdown
- Provide copy and download actions

Tech Stack:

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand

## Backend (apps/api)

Responsibilities:

- Validate GitHub URLs
- Fetch repository metadata
- Analyze repository structure
- Communicate with Ollama
- Return generated documentation

Tech Stack:

- Node.js
- Express
- TypeScript
- Zod

## Analyzer Package (packages/analyzer)

Responsibilities:

- Detect framework
- Detect package manager
- Extract scripts from package.json
- Extract environment variable names
- Detect deployment configuration

## AI Layer

Ollama will run locally and receive structured prompts based on repository analysis.

Model recommendation:

- qwen2.5-coder:7b

## Database (Future Phase)

Supabase PostgreSQL will store:

- analyzed repositories
- generated documentation
- generation history

## Deployment Plan

Frontend: Vercel
Backend: Render or Railway
AI Engine: Local during development

## Monorepo Structure

ReadmePilot/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── analyzer/
│   ├── prompts/
│   └── markdown/
├── docs/
└── README.md