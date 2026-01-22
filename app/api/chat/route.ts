import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// 1. Force dynamic to prevent caching issues
export const dynamic = 'force-dynamic';

// 2. The actual Chat Handler (POST)
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o-mini'), 
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("AI API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

// 3. A GET handler just to prove the API is "alive"
export async function GET() {
  return new Response("API is active. Use POST to chat.", { status: 200 });
}