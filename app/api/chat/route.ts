import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import fs from 'fs';
import path from 'path';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Try to read instructions, but don't crash if it fails
    let systemPrompt = "You are a helpful assistant.";
    try {
      const filePath = path.join(process.cwd(), 'instructions.txt');
      if (fs.existsSync(filePath)) {
        systemPrompt = fs.readFileSync(filePath, 'utf8');
      }
    } catch (e) {
      console.error("Instructions file read error:", e);
    }

    // 2. Stream
    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("API ROUTE ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}