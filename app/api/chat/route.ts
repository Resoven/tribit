import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Check if API key exists in the environment
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY in Railway Variables");
    }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("DETAILED_API_ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  return new Response("API is live", { status: 200 });
}