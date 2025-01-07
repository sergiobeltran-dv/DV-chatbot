import { MessageSquare, Trash2 } from 'lucide-react';
import { Chat } from '../../types/chat';
import { Button } from '../ui/button';

interface ChatListProps {
  chats: Chat[];
  selectedChatId?: string;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
}

export function ChatList({ chats, selectedChatId, onSelectChat, onDeleteChat }: ChatListProps) {
  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-2">
      {chats.map((chat) => (
        <div key={chat.id} className="flex items-center gap-2 group">
          <Button
            variant={chat.id === selectedChatId ? 'secondary' : 'ghost'}
            className="flex-1 justify-start gap-2 text-left"
            onClick={() => onSelectChat(chat.id)}
          >
            <MessageSquare size={16} />
            <span className="truncate">{chat.title}</span>
          </Button>
          {chats.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onDeleteChat(chat.id)}
            >
              <Trash2 size={16} className="text-red-500" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}