import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://readme-pilot.vercel.app'),

  title: {
    default: 'ReadmePilot — AI-Powered GitHub Documentation Generator',
    template: '%s | ReadmePilot',
  },

  description:
    'Generate professional README files, API documentation, environment guides, and deployment instructions from any public GitHub repository using AI.',

  keywords: [
    'README generator',
    'AI README generator',
    'GitHub documentation generator',
    'GitHub README generator',
    'AI documentation',
    'developer documentation',
    'GitHub tools',
    'open source documentation',
  ],

  authors: [
    {
      name: 'Tanweer Ansari',
    },
  ],

  creator: 'Tanweer Ansari',

  applicationName: 'ReadmePilot',

  generator: 'Next.js',

  alternates: {
    canonical: 'https://readme-pilot.vercel.app',
  },

  openGraph: {
    type: 'website',
    url: 'https://readme-pilot.vercel.app',
    title: 'ReadmePilot — AI-Powered GitHub Documentation Generator',
    description:
      'Turn any public GitHub repository into professional developer documentation with AI.',
    siteName: 'ReadmePilot',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ReadmePilot — AI-Powered GitHub Documentation Generator',
    description:
      'Turn any public GitHub repository into professional developer documentation with AI.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}