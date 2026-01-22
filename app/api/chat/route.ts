import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // 1. Log that we received a request
    console.log("Chat request received");

    const { messages } = await req.json();

    // 2. Critical Check: Is the API Key actually there?
    if (!process.env.OPENAI_API_KEY) {
      console.error("ERROR: OPENAI_API_KEY is missing from environment variables.");
      return new Response(JSON.stringify({ error: "API Key missing on server" }), { status: 500 });
    }

    // 3. Attempt to stream
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    // 4. Return the specific stream type your build logs requested
    return result.toTextStreamResponse();

  } catch (error: any) {
    // This will print the EXACT error in your Railway "Deploy Logs"
    console.error("BACKEND CRASH:", error.message);
    
    return new Response(JSON.stringify({ 
      error: "Internal Server Error", 
      details: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}