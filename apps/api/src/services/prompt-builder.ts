type PromptInput = {
  repository: {
    name: string
    description: string
    languages: string[]
  }
  analysis: {
    framework: string
    packageManager: string
    envVariables: string[]
    deploymentTargets: string[]
    scripts: Record<string, string>
  }
}

export function buildDocumentationPrompt(input: PromptInput) {
  const { repository, analysis } = input

  return `
You are a senior technical writer and open-source maintainer.

Generate professional GitHub documentation in Markdown.

Repository Information
- Name: ${repository.name}
- Description: ${repository.description}
- Languages: ${repository.languages.join(', ')}
- Framework: ${analysis.framework}
- Package Manager: ${analysis.packageManager}

Available Scripts
${Object.entries(analysis.scripts)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\\n')}

Environment Variables Detected
${analysis.envVariables.length ? analysis.envVariables.join(', ') : 'None detected'}

Deployment Targets Detected
${analysis.deploymentTargets.length ? analysis.deploymentTargets.join(', ') : 'General Node.js hosting'}

Generate a complete GitHub-ready README.md with these sections:

# Project Name
## Overview
## Features
## Tech Stack
## Installation
## Usage
## Available Scripts
## Environment Variables
## Deployment
## API Documentation
## Contributing

Requirements
- Use clear and concise technical writing.
- Use proper Markdown headings.
- Include code blocks with language identifiers (bash, js, ts, env).
- Make installation commands match the detected package manager.
- If the framework is Express.js, include a small Express example.
- If no environment variables are detected, include only common standard variables relevant to the framework.
- Keep the documentation realistic and avoid inventing APIs that are not implied by the framework.

IMPORTANT FORMATTING RULES
- Generate valid GitHub-Flavored Markdown (GFM).
- Output ONLY the Markdown document, with no additional commentary.
- Every table must use proper Markdown table syntax.
- Never merge multiple column names into a single cell.
- Always include the separator row made of dashes.

Use this exact table format for scripts:

| Task | Command | Description |
|------|---------|-------------|
| Start development server | \`npm run dev\` | Start the development server |

Use this exact table format for environment variables:

| Variable | Type | Default | Description |
|----------|------|----------|-------------|
| NODE_ENV | string | development | Application environment |

For deployment instructions, include a short "Production Best Practices" subsection with 3-5 practical recommendations.

The final output should render cleanly on GitHub without any broken tables or malformed Markdown.
`
}