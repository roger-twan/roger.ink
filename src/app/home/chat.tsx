'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import IconChatbot from '@public/icons/chatbot.svg';
import ChatBox from '@/components/ChatBox';

export default function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isChatOpen]);

  return (
    <>
      <button
        onClick={() => setIsChatOpen(true)}
        data-gtm-action="click_ai_chat_btn"
        className="group relative z-10 inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100 shadow-sm shadow-cyan-950/20 transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-300/15"
      >
        <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent transition duration-700 group-hover:translate-x-[220%]" />
        <span className="relative flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-cyan-300/15 text-cyan-100 transition group-hover:bg-cyan-300/25">
            <IconChatbot className="size-4" />
          </span>
          Chat with My AI Assistant
        </span>
      </button>

      {isMounted &&
        isChatOpen &&
        createPortal(
          <div className="fixed inset-0 z-[9999] flex min-h-dvh items-center justify-center bg-slate-950/55 p-4 backdrop-blur-lg">
            <div className="relative h-[80dvh] w-full max-w-2xl overflow-hidden rounded-[2rem] bg-neutral-950 p-px shadow-[0_24px_90px_rgba(8,47,73,0.55),0_0_0_1px_rgba(255,255,255,0.08)] sm:h-[70dvh] md:h-[600px]">
              <span className="animate-workflow-border pointer-events-none absolute left-1/2 top-1/2 h-[160%] w-[160%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_45deg,rgba(34,211,238,0.75)_75deg,rgba(190,242,100,0.65)_105deg,transparent_140deg,transparent_360deg)] opacity-70" />
              <div className="relative m-[3px] h-[calc(100%-6px)] overflow-hidden rounded-[1.8rem] bg-neutral-950 p-2">
                <div className="h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900">
                  <ChatBox isOpen={true} onClose={() => setIsChatOpen(false)} />
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
