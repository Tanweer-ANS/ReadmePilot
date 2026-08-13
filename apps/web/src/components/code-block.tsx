'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language: string
  value: string
}

export function CodeBlock({ language, value }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-800">
      <div className="border-b border-gray-800 bg-gray-900 px-4 py-2 text-xs text-gray-400">
        {language}
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#0a0a0a',
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}