# ReadmePilot — Product Requirements

## Problem

Many GitHub repositories have poor or missing documentation.

Developers waste time writing:

- README files
- Installation guides
- Environment variable lists
- API documentation
- Deployment instructions

## Solution

ReadmePilot analyzes a public GitHub repository and uses AI to generate professional documentation automatically.

## Main Flow

1. User pastes a GitHub repository URL
2. Repository analyzer fetches metadata and files
3. AI generates documentation
4. User previews Markdown
5. User downloads the result

## MVP Features

- GitHub repository URL input
- README generation
- Installation guide
- Environment variable extraction
- Deployment instructions
- Basic API documentation

## Non-Goals

- Private repositories
- GitHub OAuth
- Pull request creation
- Team collaboration
- Real-time AI streaming

## Success Criteria

The app should:

- Accept valid public GitHub URLs
- Detect the project tech stack
- Generate a readable README
- Extract environment variables
- Produce copy-paste-ready Markdown