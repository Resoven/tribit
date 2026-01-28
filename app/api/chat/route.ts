import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import fs from 'fs';
import path from 'path';

// This is critical for Railway deployments
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Fix: Use a more robust path resolution for Railway's file system
    const instructionsPath = path.resolve(process.cwd(), 'instructions.txt');
    let systemPrompt = "You are a helpful assistant.";
    
    if (fs.existsSync(instructionsPath)) {
      systemPrompt = fs.readFileSync(instructionsPath, 'utf8');
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: systemPrompt,
    });

    // Next.js 15 requires this specific stream format
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("DEBUG - API ERROR:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}