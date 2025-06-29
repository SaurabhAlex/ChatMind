import React from 'react';
import { Box, Stack, Text, Button } from '@chakra-ui/react';
import { AddIcon, ChatIcon } from './icons';

interface ChatHistory {
  id: string;
  title: string;
}

interface SidebarProps {
  chatHistory: ChatHistory[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  selectedChatId: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  chatHistory,
  onNewChat,
  onSelectChat,
  selectedChatId,
}) => {
  return (
    <Box
      bg="gray.800"
      w="260px"
      h="100vh"
      p={4}
      color="white"
      borderRight="1px"
      borderColor="gray.600"
    >
      <Button
        onClick={onNewChat}
        colorScheme="gray"
        variant="outline"
        w="100%"
        mb={4}
        leftIcon={<AddIcon />}
      >
        New chat
      </Button>
      <Box borderBottom="1px" borderColor="gray.600" mb={4} />
      <Stack spacing={2}>
        {chatHistory.map((chat) => (
          <Button
            key={chat.id}
            variant="ghost"
            justifyContent="flex-start"
            onClick={() => onSelectChat(chat.id)}
            isActive={chat.id === selectedChatId}
            _hover={{ bg: 'gray.700' }}
            _active={{ bg: 'gray.600' }}
            leftIcon={<ChatIcon />}
          >
            <Text noOfLines={1}>{chat.title}</Text>
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default Sidebar; 