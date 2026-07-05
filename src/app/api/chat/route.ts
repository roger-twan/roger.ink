import { NextRequest, NextResponse } from 'next/server';

export interface ChatRequest {
  message: string;
  conversationId?: string | null;
}

export interface ChatResponse {
  answer: string;
  conversationId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
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

    const ragUrl = new URL('/api/query', ragApiHost);
    ragUrl.searchParams.set('q', message);
    if (conversationId) {
      ragUrl.searchParams.set('conversation_id', conversationId);
    }

    const ragResponse = await fetch(ragUrl, {
      method: 'GET',
      headers: {
        'x-api-token': apiToken,
      },
    });

    if (!ragResponse.ok) {
      throw new Error(`RAG API error: ${ragResponse.status}`);
    }

    const ragData = await ragResponse.json();
    const response: ChatResponse = {
      answer:
        ragData.result || 'Sorry, I could not find any relevant information',
      conversationId: ragData.conversation_id,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 },
    );
  }
}
