import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

// This allows for longer processing times if needed
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Verification check for the API Key in Railway environment
    if (!process.env.OPENAI_API_KEY) {
      console.error("ERROR: OPENAI_API_KEY is missing from Railway variables.");
      return new Response('API Key Missing', { status: 500 });
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // Use toTextStreamResponse as requested by your compiler logs
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Backend Crash Details:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}