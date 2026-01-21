import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

// This explicitly pulls the key from Railway's environment
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("LOGS ERROR:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}