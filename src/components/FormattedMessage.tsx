import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Preprocesses raw markdown text to clean unintended formatting and escaping artifacts
 * without altering legitimate code blocks, text, or medical wording.
 */
export function preprocessMarkdown(raw: string): string {
  if (!raw) return '';

  let text = raw;

  // 1. Normalize literal escaped newlines (e.g. "\\n" string literals from JSON or double-encoded strings)
  // Only convert if the string contains "\\n" and we are outside code blocks
  if (text.includes('\\n') && !text.includes('\n')) {
    text = text.replace(/\\n/g, '\n');
  }

  // 2. Separate code blocks (both fenced and inline) to prevent altering intentional code or backslashes in code
  const codeBlockRegex = /(```[\s\S]*?```|`[^`\n]+`)/g;
  const parts = text.split(codeBlockRegex);

  return parts
    .map((part) => {
      // If this part is a code block, leave it untouched
      if (
        (part.startsWith('```') && part.endsWith('```')) ||
        (part.startsWith('`') && part.endsWith('`'))
      ) {
        return part;
      }

      let p = part;

      // Fix unintended escaped asterisks: e.g. \*\*bold\*\* -> **bold** or \*italic\* -> *italic*
      // or escaped asterisks used as bullet items
      p = p.replace(/\\\*/g, '*');

      // Fix unintended escaped underscores: e.g. \_word\_ -> _word_
      p = p.replace(/\\_/g, '_');

      // Fix unintended escaped numbered lists: e.g. "\1." or "1\." at start of line or after newline
      p = p.replace(/(^|\n)(\s*)\\?([0-9]+)\\\./g, '$1$2$3.');
      p = p.replace(/(^|\n)(\s*)\\([0-9]+)\./g, '$1$2$3.');

      // Fix unintended escaped bullets at line beginnings: e.g. "\-" or "\+" or "\*" followed by space
      p = p.replace(/(^|\n)(\s*)\\[*\-+]\s+/g, '$1$2- ');

      // Fix unintended escaped headings at line beginnings: e.g. "\#" or "\##"
      p = p.replace(/(^|\n)(\s*)\\(#{1,6})\s+/g, '$1$2$3 ');

      // Fix unintended escaped links: e.g. "\[text\]\(url\)" -> "[text](url)"
      p = p.replace(/\\\[([^\n\]]+)\\\]\\\(([^)\s]+)\\\)/g, '[$1]($2)');
      p = p.replace(/\\\[([^\n\]]+)\\\]\(([^)\s]+)\)/g, '[$1]($2)');
      p = p.replace(/\[([^\n\]]+)\]\\\(([^)\s]+)\\\)/g, '[$1]($2)');

      // Ensure lists following a paragraph without a blank line render as proper lists in markdown
      p = p.replace(/([^\n])\n([0-9]+\.\s+)/g, '$1\n\n$2');
      p = p.replace(/([^\n])\n([*\-+]\s+)/g, '$1\n\n$2');

      return p;
    })
    .join('');
}

/**
 * Validates whether a URL protocol is safe for rendering in markdown links.
 * Restricts to http, https, mailto, tel, and relative/anchor links.
 */
function isSafeUrl(href?: string): boolean {
  if (!href) return false;
  const trimmed = href.trim();
  const lower = trimmed.toLowerCase();

  // Block dangerous schemes
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:') ||
    lower.startsWith('file:')
  ) {
    return false;
  }

  return (
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:') ||
    lower.startsWith('/') ||
    lower.startsWith('#')
  );
}

interface FormattedMessageProps {
  content: string;
  className?: string;
  isUser?: boolean;
}

export const FormattedMessage: React.FC<FormattedMessageProps> = ({
  content,
  className = '',
  isUser = false
}) => {
  if (!content) return null;

  const processed = preprocessMarkdown(content);

  // If this is a user message with no markdown formatting, render simply with proper line breaks
  if (isUser) {
    return (
      <div className={`whitespace-pre-wrap break-words ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <div className={`markdown-content break-words text-xs sm:text-sm leading-relaxed ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-bold font-display text-foreground mt-3 mb-1.5 first:mt-0 leading-snug">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold font-display text-foreground mt-2.5 mb-1 first:mt-0 leading-snug">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-semibold font-display text-foreground mt-2 mb-1 first:mt-0 leading-snug">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xs sm:text-sm font-semibold text-foreground mt-1.5 mb-0.5 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-1.5 leading-relaxed first:mt-0 last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-5 my-2 space-y-1 leading-relaxed">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 my-2 space-y-1 leading-relaxed">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed pl-0.5 marker:text-primary/80">
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic">
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-3 border-primary/60 pl-3 my-2 italic text-muted-foreground bg-primary/5 py-1 rounded-r-lg">
              {children}
            </blockquote>
          ),
          code: ({ children, className: codeClass }) => {
            const isBlock = codeClass && codeClass.includes('language-');
            if (isBlock) {
              return (
                <pre className="my-2 p-2.5 rounded-lg bg-muted text-[11px] font-mono overflow-x-auto text-foreground border border-border">
                  <code>{children}</code>
                </pre>
              );
            }
            return (
              <code className="px-1.5 py-0.5 rounded bg-muted/80 text-[11px] font-mono text-foreground font-normal border border-border/40">
                {children}
              </code>
            );
          },
          a: ({ href, children }) => {
            if (!isSafeUrl(href)) {
              return <span>{children}</span>;
            }
            const isExternal = href?.startsWith('http://') || href?.startsWith('https://');
            return (
              <a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-primary hover:underline font-semibold inline-flex items-center gap-0.5 cursor-pointer"
              >
                {children}
              </a>
            );
          },
          hr: () => (
            <hr className="my-2.5 border-border/60" />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto my-2 rounded-lg border border-border">
              <table className="w-full text-left text-xs border-collapse">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="p-2 border-b border-border bg-muted/60 font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="p-2 border-b border-border/60 text-muted-foreground">
              {children}
            </td>
          )
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
};

export default FormattedMessage;
