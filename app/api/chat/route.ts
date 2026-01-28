import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // TESTING: Hardcoded prompt to bypass file system issues
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: "You are a helpful AI named Tribit. Respond clearly and concisely.",
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    // This will show up in your Railway "Deployments" -> "Logs"
    console.error("CRITICAL API ERROR:", error);
    return new Response(JSON.stringify({ 
      error: "API Error", 
      details: error.message 
    }), { status: 500 });
  }
}