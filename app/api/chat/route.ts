import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Use the hardcoded key here just to test!
    const openai = createOpenAI({ 
      apiKey: "sk-proj-..." 
    });

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Chat Error:", error);
    return new Response(error.message || "Internal Server Error", { status: 500 });
  }
}