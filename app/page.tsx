'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // We add 'error' here to see if the AI connection is failing
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold mb-4 border-b pb-2">Tribit Chat</h1>
      
      {error && (
        <div className="p-4 mb-4 text-red-800 bg-red-100 rounded border border-red-300">
          Error: {error.message}
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-20">
        {messages.length === 0 && (
          <p className="text-gray-500 italic">No messages yet. Try typing below!</p>
        )}
        
        {messages.map(m => (
          <div key={m.id} className={`p-3 rounded-lg mb-2 ${m.role === 'user' ? 'bg-blue-50 ml-4' : 'bg-gray-100 mr-4'}`}>
            <span className="font-bold block text-xs uppercase text-gray-400">
              {m.role === 'user' ? 'You' : 'AI'}
            </span>
            <span className="whitespace-pre-wrap">{m.content}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
        <div className="max-w-md mx-auto">
          <input
            className="w-full p-3 border border-gray-300 rounded shadow-sm text-black bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            value={input}
            placeholder="Say something to Tribit..."
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}