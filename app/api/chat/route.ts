import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Verify the API Key exists in Railway environment
    if (!process.env.OPENAI_API_KEY) {
      console.error("CRITICAL ERROR: OPENAI_API_KEY is missing.");
      return new Response('Error: API Key is missing on the server.', { status: 500 });
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("AI GATEWAY ERROR:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Server Error", 
        details: error.message 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}