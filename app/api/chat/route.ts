import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { promises as fs } from 'fs';
import path from 'path';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Read your instructions.txt
  const filePath = path.join(process.cwd(), 'instructions.txt');
  const systemInstructions = await fs.readFile(filePath, 'utf8');

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: systemInstructions,
    messages,
  });

  return result.toDataStreamResponse();
}