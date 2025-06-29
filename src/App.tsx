import React, { useState } from 'react';
import { ChakraProvider, Flex, Box, useToast } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { sendMessage } from './services/openai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
    };
    setChats([...chats, newChat]);
    setSelectedChatId(newChat.id);
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
    };

    // Update chat with user's message
    setChats(chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          title: chat.messages.length === 0 ? message.slice(0, 30) + '...' : chat.title,
        };
      }
      return chat;
    }));

    // Call OpenAI API
    setIsLoading(true);
    try {
      const selectedChat = chats.find(chat => chat.id === selectedChatId);
      if (!selectedChat) return;

      const apiMessages: ChatMessage[] = selectedChat.messages.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text,
      }));

      const response = await sendMessage([...apiMessages, { role: 'user', content: message }]);

      // Add AI response to chat
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isUser: false,
      };

      setChats(chats.map(chat => {
        if (chat.id === selectedChatId) {
          return {
            ...chat,
            messages: [...chat.messages, aiMessage],
          };
        }
        return chat;
      }));
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response from AI. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <ChakraProvider>
      <Flex h="100vh" overflow="hidden">
        <Sidebar
          chatHistory={chats}
          onNewChat={createNewChat}
          onSelectChat={setSelectedChatId}
          selectedChatId={selectedChatId}
        />
        <Box flex={1} bg="gray.900" position="relative">
          {selectedChat ? (
            <>
              <Box
                overflowY="auto"
                h="calc(100vh - 80px)"
                css={{
                  '&::-webkit-scrollbar': {
                    width: '4px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'gray.500',
                    borderRadius: '24px',
                  },
                }}
              >
                {selectedChat.messages.map(message => (
                  <ChatMessage
                    key={message.id}
                    message={message.text}
                    isUser={message.isUser}
                  />
                ))}
              </Box>
              <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </>
          ) : (
            <Flex
              h="100%"
              align="center"
              justify="center"
              color="gray.500"
              fontSize="xl"
            >
              Select a chat or create a new one to get started
            </Flex>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
