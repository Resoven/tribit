import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Check if the API key exists in the environment
    if (!process.env.OPENAI_API_KEY) {
      return new Response('Missing OPENAI_API_KEY in Railway variables', { status: 500 });
    }

    const result = streamText({
      model: openai('gpt-4o-mini'), // Using a fast, reliable model
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Backend Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}