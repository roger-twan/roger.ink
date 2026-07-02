import type { Metadata } from 'next';
import ChatBox from '@/components/ChatBox';

export const metadata: Metadata = {
  title: 'Chat with my AI assistant | Roger Twan',
  description:
    "Ask Roger's RAG-powered AI assistant about his work, projects, notes, and product-building approach.",
};

export default function ChatPage() {
  return (
    <div className="w-full bg-white p-0">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 pb-8 pt-16 text-white sm:pb-16 sm:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_75%_40%,rgba(190,242,100,0.10),transparent_30%)]" />
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col items-center">
            <h1 className="mb-6 text-center text-4xl font-semibold tracking-tight md:text-5xl">
              Chat with my AI assistant
            </h1>
            <p className="mb-8 max-w-2xl text-center text-lg leading-8 text-white/65">
              Ask about my projects, notes, and how I use AI to support product
              work from idea to delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Section - Overlapping Hero */}
      <section className="px-4 -mt-12 sm:-mt-18 pb-16">
        <div className="container mx-auto max-w-4xl">
          <div className="h-[600px] overflow-hidden rounded-2xl border border-cyan-300/20 bg-neutral-950 shadow-2xl shadow-cyan-950/20">
            <ChatBox isOpen={true} embedded={true} />
          </div>
        </div>
      </section>
    </div>
  );
}
