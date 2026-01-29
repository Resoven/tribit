import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // 1. SAFETY CHECK: Validate API Key
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '') {
      console.error("CRITICAL ERROR: OPENAI_API_KEY is missing from environment variables.");
      return new Response(
        JSON.stringify({ error: "API Key Missing. Please set OPENAI_API_KEY in Railway variables." }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { messages } = await req.json();

    // 2. Execute AI Stream
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // 3. Respond with a formatted data stream
    return result.toDataStreamResponse();

  } catch (error: any) {
    console.error("API ROUTE ERROR:", error);
    
    // Fallback for client-side exception prevention
    return new Response(
      JSON.stringify({ 
        error: "Server Error", 
        details: error.message || "An unexpected error occurred" 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}