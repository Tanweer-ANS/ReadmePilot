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
You are a senior technical writer.

Generate professional GitHub documentation in Markdown.

Repository Information:
- Name: ${repository.name}
- Description: ${repository.description}
- Languages: ${repository.languages.join(', ')}
- Framework: ${analysis.framework}
- Package Manager: ${analysis.packageManager}

Available Scripts:
${Object.entries(analysis.scripts)
  .map(([key, value]) => `- ${key}: ${value}`)
  .join('\\n')}

Environment Variables:
${analysis.envVariables.length ? analysis.envVariables.join(', ') : 'None detected'}

Deployment Targets:
${analysis.deploymentTargets.length ? analysis.deploymentTargets.join(', ') : 'General Node.js hosting'}

Generate these sections in valid Markdown:

# Project Name
## Overview
## Features
## Tech Stack
## Installation
## Usage
## Environment Variables
## Deployment
## API Documentation
## Contributing

Requirements:
- Use proper Markdown headings
- Include code blocks for terminal commands
- Create a table for environment variables
- Make the documentation concise but professional
- Do not invent APIs that are not implied by the framework
`
}