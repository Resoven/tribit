import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // DEBUG LOG: This will show up in Railway logs
  console.log("Key present:", !!process.env.OPENAI_API_KEY);
  console.log("Key starts with:", process.env.OPENAI_API_KEY?.slice(0, 7));

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "Server variable missing" }), { status: 500 });
  }

  const openai = createOpenAI({ apiKey });

  try {
    const { messages } = await req.json();
    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
    });
    return result.toDataStreamResponse();
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}