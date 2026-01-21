'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from 'react';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, error } = useChat();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ padding: '20px', color: 'black' }}>Initializing Tribit...</div>;

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Tribit AI</h1>
      </header>
      
      {error && (
        <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
          Connection Error: {error.message}
        </div>
      )}

      <main style={{ paddingBottom: '100px' }}>
        {messages.length === 0 && <p style={{ color: '#666' }}>Ask Tribit anything...</p>}
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: '15px', padding: '12px', background: m.role === 'user' ? '#f0f7ff' : '#f4f4f5', borderRadius: '8px' }}>
            <strong style={{ display: 'block', fontSize: '0.75rem', color: '#888', marginBottom: '4px' }}>
              {m.role === 'user' ? 'YOU' : 'TRIBIT'}
            </strong>
            {m.content}
          </div>
        ))}
      </main>

      <form onSubmit={handleSubmit} style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '20px', background: 'white', borderTop: '1px solid #eee' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <input
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px', color: 'black' }}
            value={input}
            placeholder="Type a message..."
            onChange={handleInputChange}
          />
        </div>
      </form>
    </div>
  );
}