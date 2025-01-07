import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Message as MessageType } from '../../types/chat';
import { Button } from '../ui/button';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add support for code block copying and syntax highlighting
  const renderMarkdown = (content: string) => (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2"
                onClick={copyToClipboard}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </Button>
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {message.content}
    </ReactMarkdown>
  );

  return (
    <div className={`py-8 ${
      message.role === 'assistant' 
        ? 'bg-gray-50 dark:bg-gray-800' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="max-w-3xl mx-auto px-4 flex gap-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === 'assistant'
            ? 'bg-[#76B82A] text-white' // Datavail green
            : 'bg-gray-200 dark:bg-gray-700'
        }`}>
          {message.role === 'assistant' ? 'DV' : 'U'}
        </div>
        <div className="flex-1 space-y-4">
          <div className="prose dark:prose-invert max-w-none">
            {renderMarkdown(message.content)}
          </div>
        </div>
      </div>
    </div>
  );
}