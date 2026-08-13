'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from './code-block'

interface MarkdownPreviewProps {
  content: string
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <article className="prose prose-invert max-w-none prose-pre:p-0 prose-pre:bg-transparent">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')

            if (match) {
              return (
                <CodeBlock
                  language={match[1]}
                  value={String(children).replace(/\n$/, '')}
                />
              )
            }

            return (
              <code
                className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-cyan-300"
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}