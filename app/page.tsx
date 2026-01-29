'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    onResponse: () => console.log("Server responded!"),
    onError: (err) => console.error("Stream Error:", err)
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: m.role === 'user' ? '#0070f3' : '#10a37f', fontWeight: 'bold', marginBottom: '4px' }}>
                {m.role.toUpperCase()}
              </div>
              <div style={{ color: '#eee', whiteSpace: 'pre-wrap' }}>{m.content}</div>
            </div>
          ))}
          {isLoading && <div style={{ color: '#10a37f', fontSize: '0.8rem' }}>Tribit is typing...</div>}
          <div ref={scrollRef} />
        </div>
      </main>

      <footer style={{ padding: '1.5rem', borderTop: '1px solid #222', backgroundColor: '#000' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input
            value={input ?? ''} // Relinked to AI State with a safety fallback
            onChange={handleInputChange}
            placeholder="Type your message..."
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #333', 
              backgroundColor: '#111', 
              color: '#fff',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !(input ?? '').trim()}
            style={{ 
              padding: '0 20px', 
              borderRadius: '8px', 
              backgroundColor: (isLoading || !(input ?? '').trim()) ? '#222' : '#fff', 
              color: '#000',
              fontWeight: 'bold',
              cursor: (isLoading || !(input ?? '').trim()) ? 'default' : 'pointer',
              border: 'none'
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </footer>
    </div>
  );
}