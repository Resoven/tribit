import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { promises as fs } from 'fs';
import path from 'path';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Verify API Key exists
    if (!process.env.OPENAI_API_KEY) {
      return new Response('API Key Missing', { status: 500 });
    }

    // 2. Read the instructions file
    // We use a try-catch specifically for the file to prevent total failure
    let systemInstructions = "You are a helpful assistant."; // Fallback instruction
    try {
      const filePath = path.join(process.cwd(), 'instructions.txt');
      systemInstructions = await fs.readFile(filePath, 'utf8');
    } catch (fileError) {
      console.warn("Could not find instructions.txt, using default assistant mode.");
    }

    // 3. Start the AI Stream
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemInstructions, 
      messages,
    });

    return result.toTextStreamResponse();

  } catch (error: any) {
    console.error("Backend Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}