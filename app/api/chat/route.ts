import { CoreMessage, streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    // Verify the API Key exists
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === '') {
      console.error("CRITICAL ERROR: OPENAI_API_KEY is not defined in Railway.");
      return new Response('Error: API Key is missing on the server.', { status: 500 });
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // This is the most compatible response method for the current AI SDK
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("AI GATEWAY ERROR:", error);
    
    // Send the actual error message back so we can see it in the browser console
    return new Response(
      JSON.stringify({ 
        error: "Server Crash", 
        details: error.message,
        hint: "Check your Railway Variables and OpenAI Credit Balance." 
      }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}