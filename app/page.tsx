'use client';

import { useChat } from '@ai-sdk/react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div style={{ color: 'black', background: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid black' }}>Tribit AI Terminal</h1>
      
      <div style={{ marginTop: '20px', paddingBottom: '80px' }}>
        {messages.length === 0 && <p>Type a message to start...</p>}
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: '15px', padding: '10px', background: '#eee', borderRadius: '8px' }}>
            <strong>{m.role === 'user' ? 'You: ' : 'Tribit: '}</strong>
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px' }}>
        <input
          style={{ width: '100%', padding: '15px', fontSize: '16px', borderRadius: '10px', border: '2px solid #000' }}
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}