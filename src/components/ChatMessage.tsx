import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { UserIcon, RobotIcon } from './icons';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const IconComponent = isUser ? UserIcon : RobotIcon;
  
  return (
    <Flex
      gap={4}
      p={6}
      bg={isUser ? 'gray.700' : 'gray.800'}
      borderBottom="1px"
      borderColor="gray.600"
      alignItems="flex-start"
    >
      <Box
        bg={isUser ? 'blue.500' : 'green.500'}
        p={2}
        borderRadius="md"
        color="white"
        fontSize="lg"
      >
        <IconComponent boxSize={5} />
      </Box>
      <Box flex={1}>
        <Text color="white" fontSize="md">
          {message}
        </Text>
      </Box>
    </Flex>
  );
};

export default ChatMessage; 