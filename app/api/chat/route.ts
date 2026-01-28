import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Safety: If instructions.txt fails, use a default prompt
    const systemPrompt = "You are Tribit, a helpful AI assistant.";

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    // This logs the SPECIFIC error to your Railway dashboard
    console.error("OPENAI_ERROR:", error.message);
    
    return new Response(JSON.stringify({ 
      error: "Server Error", 
      message: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}