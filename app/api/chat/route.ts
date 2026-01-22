import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Check if the API key is actually present
    if (!process.env.OPENAI_API_KEY) {
      console.error("Backend Error: OPENAI_API_KEY is missing");
      return new Response('Configuration Error: Missing API Key', { status: 500 });
    }

    // 2. Setup the stream
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // 3. Return the stream using the method the compiler requested
    return result.toTextStreamResponse();
    
  } catch (error: any) {
    console.error("Full Backend Crash Error:", error);
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}