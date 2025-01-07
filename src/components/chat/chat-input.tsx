import { Send, Paperclip, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';

interface ChatInputProps {
  onSend: (message: string, files?: File[]) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((message.trim() || files.length > 0) && !disabled) {
      onSend(message, files);
      setMessage('');
      setFiles([]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-800">
      <div className="max-w-3xl mx-auto">
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded px-2 py-1">
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              rows={1}
              className="w-full resize-none bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-3 pr-24 focus:outline-none focus:ring-2 focus:ring-[#76B82A]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip size={20} />
              </Button>
              <Button
                type="submit"
                disabled={!message.trim() && files.length === 0 || disabled}
                variant="ghost"
                size="sm"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,image/*"
      />
    </form>
  );
}