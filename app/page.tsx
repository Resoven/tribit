'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', textAlign: 'center', fontWeight: 'bold' }}>
        Tribit AI ✨ {isLoading && '...'}
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '1.5rem', borderLeft: m.role === 'user' ? '2px solid #555' : '2px solid #10a37f', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                {m.role === 'user' ? 'You' : 'Tribit'}
              </div>
              <div style={{ color: '#eee', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                {m.content || (isLoading && m.role === 'assistant' ? 'Thinking...' : '')}
              </div>
            </div>
          ))}
          {error && (
            <div style={{ color: '#ff4444', padding: '1rem', backgroundColor: '#200', borderRadius: '5px', fontSize: '0.8rem' }}>
              <strong>Error:</strong> {error.message}
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </main>

      <footer style={{ padding: '1.5rem', borderTop: '1px solid #222' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{ padding: '0 1.5rem', borderRadius: '8px', border: 'none', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}