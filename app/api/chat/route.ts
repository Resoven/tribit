import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Use Edge Runtime for better performance on Railway
export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Validate API Key exists
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API Key Missing in Railway Variables" }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error("API ROUTE ERROR:", error);
    return new Response(
      JSON.stringify({ 
        error: "Server Error", 
        details: error.message || "Unknown error" 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}