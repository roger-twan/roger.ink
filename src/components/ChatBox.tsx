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

const CHAT_HISTORY_STORAGE_KEY = 'roger-ai-chat-history';
const CONVERSATION_ID_STORAGE_KEY = 'roger-ai-conversation-id';

export function useChatStorage(pausePersistence = false) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CHAT_HISTORY_STORAGE_KEY);
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
    if (isLoaded && !pausePersistence && typeof window !== 'undefined') {
      localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, isLoaded, pausePersistence]);

  const addMessage = (role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id:
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random()}`,
      role,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const updateMessage = (id: string, content: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, content } : message,
      ),
    );
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return { messages, addMessage, updateMessage, clearMessages, isLoaded };
}

export default function ChatBox({
  isOpen,
  onClose,
  embedded = false,
}: ChatBoxProps) {
  const [pauseChatPersistence, setPauseChatPersistence] = useState(false);
  const { messages, addMessage, updateMessage, clearMessages, isLoaded } =
    useChatStorage(pauseChatPersistence);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAwaitingResponse, setIsAwaitingResponse] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const clearChat = () => {
    clearMessages();
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CONVERSATION_ID_STORAGE_KEY);
    }
  };

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
    setPauseChatPersistence(true);
    addMessage('user', userMessage);
    const assistantMessage = addMessage('assistant', '');
    setStreamingMessageId(assistantMessage.id);
    setIsLoading(true);
    setIsAwaitingResponse(true);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationId:
            typeof window !== 'undefined'
              ? localStorage.getItem(CONVERSATION_ID_STORAGE_KEY)
              : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      if (!response.body) {
        throw new Error('Streaming response is not available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let streamedAnswer = '';

      const handleStreamEvent = (rawEvent: string) => {
        const lines = rawEvent.split(/\r?\n/);
        let eventType = 'message';
        const dataLines: string[] = [];

        for (const line of lines) {
          if (line.startsWith('event:')) {
            eventType = line.slice('event:'.length).trim();
          } else if (line.startsWith('data:')) {
            dataLines.push(line.slice('data:'.length).trimStart());
          }
        }

        if (dataLines.length === 0) return;

        const data = JSON.parse(dataLines.join('\n'));

        if (
          data.conversation_id &&
          typeof window !== 'undefined' &&
          (eventType === 'metadata' || eventType === 'done')
        ) {
          localStorage.setItem(
            CONVERSATION_ID_STORAGE_KEY,
            data.conversation_id,
          );
        }

        if (eventType === 'token' && typeof data.content === 'string') {
          streamedAnswer += data.content;
          setIsAwaitingResponse(false);
          updateMessage(assistantMessage.id, streamedAnswer);
        }

        if (eventType === 'done') {
          const finalAnswer =
            typeof data.answer === 'string' ? data.answer : streamedAnswer;
          if (finalAnswer) {
            streamedAnswer = finalAnswer;
            updateMessage(assistantMessage.id, finalAnswer);
          }
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split(/\r?\n\r?\n/);
        buffer = events.pop() ?? '';
        events.forEach(handleStreamEvent);
      }

      buffer += decoder.decode();
      if (buffer.trim()) {
        handleStreamEvent(buffer);
      }

      if (!streamedAnswer) {
        updateMessage(
          assistantMessage.id,
          'Sorry, I could not find any relevant information.',
        );
      }
    } catch (error) {
      console.error('Chat API error:', error);
      updateMessage(
        assistantMessage.id,
        'Sorry, I encountered an error. Please try again later.',
      );
    } finally {
      setIsLoading(false);
      setIsAwaitingResponse(false);
      setStreamingMessageId(null);
      setPauseChatPersistence(false);
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
            onClick={clearChat}
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
          messages.map((message) => {
            const isStreamingMessage = message.id === streamingMessageId;

            if (isStreamingMessage && !message.content) {
              return null;
            }

            return (
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
                  {!isStreamingMessage && (
                    <span
                      className={`text-xs mt-1 block ${
                        message.role === 'user'
                          ? 'text-blue-200 text-right'
                          : 'text-gray-400 text-left'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
        {isAwaitingResponse && (
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
