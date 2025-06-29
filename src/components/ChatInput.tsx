import React, { useState } from 'react';
import { Box, Input, Button, Flex } from '@chakra-ui/react';
import { SendIcon } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box
      position="fixed"
      bottom={0}
      left="260px"
      right={0}
      p={4}
      bg="gray.800"
      borderTop="1px"
      borderColor="gray.600"
    >
      <form onSubmit={handleSubmit}>
        <Flex gap={2}>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            bg="gray.700"
            border="none"
            color="white"
            _placeholder={{ color: 'gray.400' }}
            _focus={{ boxShadow: 'none', border: '1px solid', borderColor: 'blue.500' }}
            disabled={isLoading}
          />
          <Button
            type="submit"
            colorScheme="blue"
            disabled={!message.trim() || isLoading}
            px={6}
            isLoading={isLoading}
          >
            <SendIcon boxSize={5} />
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default ChatInput; 