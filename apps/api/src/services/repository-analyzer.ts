import { getFileContent, getRepositoryTree } from './github.service'

type AnalysisResult = {
    framework: string
    packageManager: string
    envVariables: string[]
    deploymentTargets: string[]
    scripts: Record<string, string>
}

function detectPackageManager(files: string[]) {
    if (files.includes('pnpm-lock.yaml')) return 'pnpm'
    if (files.includes('yarn.lock')) return 'yarn'
    if (files.includes('package-lock.json')) return 'npm'
    return 'unknown'
}

function detectFramework(files: string[], packageJson: any) {
    const deps = {
        ...(packageJson?.dependencies || {}),
        ...(packageJson?.devDependencies || {}),
    }

    // Root package.json dependencies
    if (deps.next) return 'Next.js'
    if (deps.react) return 'React'
    if (deps.express) return 'Express.js'
    if (deps.fastify) return 'Fastify'

    // Monorepo file-based detection
    if (files.some((f) => f.includes('next.config'))) {
        return 'Next.js'
    }

    if (files.some((f) => f.endsWith('vite.config.ts') || f.endsWith('vite.config.js'))) {
        return 'React/Vite'
    }

    if (files.some((f) => f.includes('src/routes') || f.includes('routes/'))) {
        return 'Express.js'
    }

    if (files.some((f) => f.endsWith('main.py'))) {
        return 'FastAPI/Python'
    }

    return 'Unknown'
}

function extractEnvVariables(content: string | null) {
    if (!content) return []

    return content
        .split('\\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#') && line.includes('='))
        .map((line) => line.split('=')[0])
}

function detectDeploymentTargets(files: string[]) {
    const targets: string[] = []

    if (files.includes('vercel.json')) targets.push('Vercel')
    if (files.includes('Dockerfile') || files.includes('docker-compose.yml')) targets.push('Docker')
    if (files.includes('render.yaml')) targets.push('Render')
    if (files.includes('railway.json')) targets.push('Railway')

    return targets
}

export async function analyzeRepository(repoUrl: string): Promise<AnalysisResult> {
    const files = await getRepositoryTree(repoUrl)

    const packageJsonContent = await getFileContent(repoUrl, 'package.json')

    let packageJson: any = null

    try {
        packageJson = packageJsonContent ? JSON.parse(packageJsonContent) : null
    } catch {
        packageJson = null
    }

    const envExample =
        (await getFileContent(repoUrl, '.env.example')) ||
        (await getFileContent(repoUrl, '.env.sample')) ||
        (await getFileContent(repoUrl, '.env.local.example'))

    return {
        framework: detectFramework(files, packageJson),
        packageManager: detectPackageManager(files),
        envVariables: extractEnvVariables(envExample),
        deploymentTargets: detectDeploymentTargets(files),
        scripts: packageJson?.scripts || {},
    }
}