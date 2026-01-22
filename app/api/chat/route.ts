
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // This tells the app to get the key from Railway's settings
    const openai = createOpenAI({ 
      apiKey: process.env.OPENAI_API_KEY 
    });

    // We remove 'await' here to allow the stream to start immediately
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Chat Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}