'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';

export default function Chat() {
  // Ensure we extract 'messages' exactly as named here
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch bg-black min-h-screen text-white">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((m) => (
          <div key={m.id} className={`mb-4 p-4 rounded-lg ${m.role === 'assistant' ? 'bg-zinc-900' : 'bg-transparent'}`}>
            <div className="text-xs font-bold text-green-400 mb-2 uppercase">
              {m.role === 'user' ? 'You' : 'Tribit'}
            </div>
            {/* Using a pre tag to ensure no Markdown formatting hides the text */}
            <pre className="whitespace-pre-wrap font-sans text-base text-zinc-100">
              {m.content}
            </pre>
          </div>
        ))}
        {isLoading && <div className="text-zinc-500 animate-pulse">TRIBIT is thinking...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-2xl p-4 bg-black">
        <input
          className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          value={input}
          placeholder="Ask TRIBIT anything..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}