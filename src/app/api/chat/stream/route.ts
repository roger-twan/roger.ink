import { NextRequest, NextResponse } from 'next/server';

export interface ChatStreamRequest {
  message: string;
  conversationId?: string | null;
}

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body: ChatStreamRequest = await request.json();
    const { message, conversationId } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 },
      );
    }

    const apiToken = process.env.RAG_PUBLIC_API_TOKEN;
    const ragApiHost = process.env.RAG_API_HOST;
    if (!apiToken || !ragApiHost) {
      console.error('RAG API configuration is not configured');
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 },
      );
    }

    const ragUrl = new URL('/api/query/stream', ragApiHost);
    ragUrl.searchParams.set('q', message);
    if (conversationId) {
      ragUrl.searchParams.set('conversation_id', conversationId);
    }

    const ragResponse = await fetch(ragUrl, {
      method: 'GET',
      headers: {
        Accept: 'text/event-stream',
        'X-Api-Token': apiToken,
      },
      signal: request.signal,
    });

    if (!ragResponse.ok) {
      throw new Error(`RAG API error: ${ragResponse.status}`);
    }

    return new Response(ragResponse.body, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'Content-Type': 'text/event-stream',
      },
    });
  } catch (error) {
    console.error('Chat stream API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat stream request' },
      { status: 500 },
    );
  }
}
