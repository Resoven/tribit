import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { promises as fs } from 'fs';
import path from 'path';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Secure pathing for Railway
    const filePath = path.join(process.cwd(), 'instructions.txt');
    let systemInstructions = "You are a helpful assistant."; // Default fallback

    try {
      systemInstructions = await fs.readFile(filePath, 'utf8');
    } catch (e) {
      console.error("Warning: instructions.txt not found, using default.", e);
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      system: systemInstructions,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to process chat" }), { status: 500 });
  }
}