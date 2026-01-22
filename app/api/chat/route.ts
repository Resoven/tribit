export const dynamic = 'force-dynamic';
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// This must be named POST for Next.js to handle the chat submission
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: openai('gpt-4o-mini'), // Ensure your OPENAI_API_KEY is in Railway variables
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Check your API Key in Railway" }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}