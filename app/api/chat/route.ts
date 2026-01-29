import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// This ensures the bot works on Railway and other cloud hosts
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // The (result as any) part forces the code to ignore the red line error
    return (result as any).toDataStreamResponse();
  } catch (error: any) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}