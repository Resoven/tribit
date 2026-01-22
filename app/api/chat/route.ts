import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Safety check for the API Key
    if (!process.env.OPENAI_API_KEY) {
      console.error("CRITICAL: OPENAI_API_KEY is missing from Railway Variables.");
      return new Response('API Key Missing', { status: 500 });
    }

    // 2. Start the AI Stream
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // 3. Use the EXACT method the compiler is asking for
    return result.toTextStreamResponse();

  } catch (error: any) {
    console.error("Server-side Crash:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}