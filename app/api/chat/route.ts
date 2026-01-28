import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: "You are Tribit, a helpful AI assistant.",
    });

    // Instead of calling a helper function that might not exist, 
    // we return the data stream directly.
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("API Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}