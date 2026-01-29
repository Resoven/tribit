'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  } as any) as any;

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
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <strong style={{ fontSize: '1.2rem' }}>Tribit AI ✨</strong>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {messages && messages.map((m: any) => (
            <div key={m.id} style={{ marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: '2px solid #333' }}>
              <div style={{ fontSize: '0.7rem', color: m.role === 'user' ? '#888' : '#10a37f', fontWeight: 'bold' }}>
                {m.role.toUpperCase()}
              </div>
              <div style={{ color: '#eee', whiteSpace: 'pre-wrap' }}>{m.content}</div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </main>

      <footer style={{ padding: '1.5rem', borderTop: '1px solid #222' }}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (input && input.trim()) handleSubmit(e);
          }} 
          style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '10px' }}
        >
          <input
            value={input || ''} 
            onChange={handleInputChange} 
            placeholder="Type a message..."
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{ padding: '0 20px', borderRadius: '8px', backgroundColor: '#fff', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </footer>
    </div>
  );
}