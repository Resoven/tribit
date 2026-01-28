import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: openai('gpt-4o-mini'), 
      messages,
      system: "You are Tribit, a helpful AI assistant.",
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    // This logs the SPECIFIC reason (like "Invalid API Key") to Railway logs
    console.error("DEBUG_OPENAI_ERROR:", error.message);
    
    return new Response(JSON.stringify({ 
      error: "Server Error", 
      message: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}