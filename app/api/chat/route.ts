import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Verification check for the API Key
    if (!process.env.OPENAI_API_KEY) {
      console.error("CRITICAL: OPENAI_API_KEY is missing from Railway variables.");
      return new Response('API Key Missing', { status: 500 });
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // Use the method your specific version of the library requires
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Backend Crash Details:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}