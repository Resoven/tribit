import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import fs from 'fs';
import path from 'path';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Load instructions with an absolute path check
    const filePath = path.join(process.cwd(), 'instructions.txt');
    const instructions = fs.readFileSync(filePath, 'utf8');

    // 2. Stream the text
    const result = await streamText({
      model: openai('gpt-4o-mini'), // Ensure this matches your plan/key
      messages,
      system: instructions,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("API ROUTE ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}