'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import IconClose from '@public/icons/close.svg';
import IconChatbot from '@public/icons/chatbot.svg';
import IconChatSend from '@public/icons/chat-send.svg';
import IconUser from '@public/icons/user.svg';
import AvatarSmall from '@public/avatar-small.jpg';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatBoxProps {
  isOpen: boolean;
  onClose?: () => void;
  embedded?: boolean;
}

const STORAGE_KEY = 'roger-ai-chat-history';

export function useChatStorage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMessages(parsed);
        } catch {
          setMessages([]);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isLoaded]);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return { messages, addMessage, clearMessages, isLoaded };
}

export default function ChatBox({
  isOpen,
  onClose,
  embedded = false,
}: ChatBoxProps) {
  const { messages, addMessage, clearMessages, isLoaded } = useChatStorage();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTo({
        top:
          messagesEndRef.current.offsetTop -
          messagesContainerRef.current.offsetTop +
          messagesContainerRef.current.scrollHeight -
          messagesContainerRef.current.clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      addMessage('assistant', data.response);
    } catch (error) {
      console.error('Chat API error:', error);
      addMessage(
        'assistant',
        'Sorry, I encountered an error. Please try again later.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (timestamp: number) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const isToday = messageDate.toDateString() === today.toDateString();

    const timeString = messageDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (isToday) {
      return timeString;
    }

    const dateString = messageDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    return `${dateString} ${timeString}`;
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col bg-white h-full w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r  from-purple-700 to-blue-600 text-white flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
          <h2 className="font-semibold">Roger&apos;s AI Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearMessages}
            className="px-3 py-1 text-xs bg-white/20 hover:bg-white/30 rounded transition-colors cursor-pointer"
            title="Clear chat"
          >
            Clear
          </button>
          {!embedded && onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded transition-colors"
              aria-label="Close"
            >
              <IconClose className="size-5 cursor-pointer" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0"
      >
        {!isLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex gap-1">
              <div className="size-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="size-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.1s' }}
              ></div>
              <div
                className="size-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              ></div>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <IconChatbot className="size-12 mx-auto mb-3 text-black opacity-50" />
            <p>
              No messages yet.
              <br />
              Start a conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className="flex-shrink-0">
                {message.role === 'user' ? (
                  <div className="size-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <IconUser className="size-5 text-gray-500" />
                  </div>
                ) : (
                  <Image
                    src={AvatarSmall}
                    alt="AI Assistant"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap text-left">
                  {message.content}
                </p>
                <span
                  className={`text-xs mt-1 block ${
                    message.role === 'user'
                      ? 'text-blue-200 text-right'
                      : 'text-gray-400 text-left'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="size-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="size-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                ></div>
                <div
                  className="size-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-gray-200 bg-white flex-shrink-0"
      >
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
            rows={1}
            className="flex-1 resize-none px-4 py-2 text-sm text-black placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[40px] max-h-[100px] leading-5 [field-sizing:content]"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <IconChatSend className="size-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
