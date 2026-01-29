'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize useChat with default fallbacks
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

  // Prevent submission if input is undefined or empty
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(input ?? '').trim() || isLoading) return;
    handleSubmit(e);
  };

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '4rem', color: '#444' }}>
              How can Tribit help you today?
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.7rem', color: m.role === 'user' ? '#0070f3' : '#10a37f', fontWeight: 'bold', marginBottom: '4px' }}>
                {m.role === 'user' ? 'YOU' : 'TRIBIT'}
              </div>
              <div style={{ color: '#eee', whiteSpace: 'pre-wrap' }}>{m.content}</div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </main>

      <footer style={{ padding: '1.5rem', borderTop: '1px solid #222' }}>
        <form onSubmit={onFormSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input
            value={input ?? ''} // Fixes the 'undefined' trim error
            onChange={handleInputChange}
            placeholder="Type here..."
            style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff' }}
          />
          <button
            type="submit"
            disabled={isLoading || !(input ?? '').trim()}
            style={{ 
              padding: '0 20px', 
              borderRadius: '8px', 
              backgroundColor: (isLoading || !(input ?? '').trim()) ? '#222' : '#fff', 
              color: '#000',
              cursor: (isLoading || !(input ?? '').trim()) ? 'default' : 'pointer'
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
        {error && <div style={{ color: 'red', fontSize: '12px', marginTop: '10px', textAlign: 'center' }}>{error.message}</div>}
      </footer>
    </div>
  );
}