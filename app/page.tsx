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
    if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Wrapped handler to prevent the "d is not a function" crash
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!handleSubmit) {
      console.error("Chat SDK not fully loaded yet.");
      return;
    }
    try {
      await handleSubmit(e);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '1.5rem', borderLeft: m.role === 'user' ? '2px solid #333' : '2px solid #10a37f', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: m.role === 'user' ? '#888' : '#10a37f', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>
                {m.role}
              </div>
              <div style={{ color: '#eee', whiteSpace: 'pre-wrap' }}>{m.content}</div>
            </div>
          ))}
          {isLoading && <div style={{ color: '#10a37f', fontSize: '0.8rem' }}>Tribit is typing...</div>}
          <div ref={scrollRef} />
        </div>
      </main>

      <footer style={{ padding: '1.5rem', borderTop: '1px solid #222' }}>
        <form onSubmit={onFormSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input
            value={input ?? ''} 
            onChange={handleInputChange} 
            placeholder="Type your message..."
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
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
        {error && <div style={{ color: 'red', fontSize: '11px', textAlign: 'center', marginTop: '10px' }}>{error.message}</div>}
      </footer>
    </div>
  );
}