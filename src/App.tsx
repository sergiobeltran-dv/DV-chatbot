import React, { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Menu, Plus, Sun, Moon, LogOut } from 'lucide-react';
import { ChatThread } from './components/chat/chat-thread';
import { ChatInput } from './components/chat/chat-input';
import { ChatList } from './components/sidebar/chat-list';
import { Button } from './components/ui/button';
import { Chat } from './types/chat';
import { useAIConversation } from './lib/client';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId) ?? chats[0];

  // Add AI conversation hook
  const [{ data: { messages: aiMessages }, isLoading: aiLoading }, handleAIMessage] = 
    useAIConversation('chatAssistant');

  const handleSendMessage = async (content: string, files?: File[]) => {
    if (!content.trim() && (!files || files.length === 0)) return;

    // Handle file attachments if present
    let processedContent = content;
    if (files && files.length > 0) {
      // TODO: Implement file upload to S3
      // For now, we'll just append file names to the message
      const fileNames = files.map(f => f.name).join(', ');
      processedContent += `\n\nAttached files: ${fileNames}`;
    }

    // Send message to AI
    await handleAIMessage(processedContent);
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setChats([...chats, newChat]);
    setSelectedChatId(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    if (chats.length > 1) {
      const newChats = chats.filter(chat => chat.id !== chatId);
      setChats(newChats);
      if (selectedChatId === chatId) {
        setSelectedChatId(newChats[0].id);
      }
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <Authenticator>
      {({ signOut }) => (
        <div className={darkMode ? 'dark' : ''}>
          <div className="h-screen flex dark:bg-gray-900">
            <div
              className={`fixed inset-y-0 z-50 flex w-72 flex-col transition-transform duration-300 ease-in-out md:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700`}
            >
              <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
                <span className="text-[#76B82A] font-bold text-xl">Datavail AI</span>
                <Button variant="ghost" size="sm" onClick={createNewChat}>
                  <Plus size={20} />
                </Button>
              </div>
              <ChatList
                chats={chats}
                selectedChatId={selectedChatId}
                onSelectChat={setSelectedChatId}
                onDeleteChat={handleDeleteChat}
              />
              <div className="p-4 border-t dark:border-gray-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </Button>
              </div>
            </div>

            <div className={`flex-1 flex flex-col ${sidebarOpen ? 'md:ml-72' : ''}`}>
              <header className="h-14 border-b dark:border-gray-800 flex items-center justify-between px-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => {
                    setSidebarOpen(!sidebarOpen);
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                >
                  <Menu size={20} />
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                  </Button>
                </div>
              </header>

              <ChatThread 
                messages={aiMessages} 
                loading={aiLoading} 
              />
              <ChatInput 
                onSend={handleSendMessage} 
                disabled={aiLoading} 
              />
            </div>
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;