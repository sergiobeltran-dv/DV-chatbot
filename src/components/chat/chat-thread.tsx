import { Message } from './message';
import { Message as MessageType } from '../../types/chat';

interface ChatThreadProps {
  messages: MessageType[];
  loading?: boolean;
}

export function ChatThread({ messages, loading }: ChatThreadProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      {loading && (
        <div className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-3xl mx-auto px-4 flex gap-6">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              AI
            </div>
            <div className="flex-1">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}