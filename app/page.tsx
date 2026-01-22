'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // @ts-ignore - Bypassing strict type check for library version mismatch
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>Tribit AI Chat</h1>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red' }}>
            Error: {error.message}
          </div>
        )}

        <div style={{ marginBottom: '20px', height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
          {messages.map(m => (
            <div key={m.id} style={{ marginBottom: '15px' }}>
              <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
              <span style={{ whiteSpace: 'pre-wrap' }}>{m.content}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            style={{ flexGrow: 1, padding: '10px', border: '2px solid black' }}
          />
          <button 
            type="submit" 
            style={{ padding: '10px 20px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}