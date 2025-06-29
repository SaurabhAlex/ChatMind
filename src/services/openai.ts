import OpenAI from 'openai';
import {
  OPENROUTER_API_KEY,
  OPENROUTER_BASE_URL,
  OPENROUTER_MODEL,
  SITE_NAME,
  SITE_URL,
} from '../config';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const openai = new OpenAI({
  baseURL: OPENROUTER_BASE_URL,
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': SITE_URL,
    'X-Title': SITE_NAME,
  },
  dangerouslyAllowBrowser: true // Enable browser usage
});

export const sendMessage = async (messages: Message[]): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: OPENROUTER_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.'
        },
        ...messages
      ],
    });

    const messageContent = completion.choices[0].message.content;
    if (!messageContent) {
      throw new Error('No response content received from API');
    }
    
    return messageContent;
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    throw error;
  }
}; 