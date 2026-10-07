import { safeHtml } from '@/lib/sanitize'

export function SafeContent({ content }: { content: string }) {
  return <div className="content-prose whitespace-pre-wrap break-words" dangerouslySetInnerHTML={{ __html: safeHtml(content) }} />
}
