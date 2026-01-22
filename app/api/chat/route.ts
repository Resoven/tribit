import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return new Response('Missing OPENAI_API_KEY in Railway variables', { status: 500 });
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // Using the method the compiler suggested for your version
    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Backend Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}