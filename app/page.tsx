'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Initialize useChat
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

  // Form handler with safety check for undefined 'input'
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const safeInput = input || ''; // Safety Guard
    if (!safeInput.trim() || isLoading) return;
    handleSubmit(e);
  };

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', textAlign: 'center', fontWeight: 'bold' }}>
        Tribit AI ✨
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '4rem', color: '#444' }}>
              How can Tribit help you today?
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '8px', backgroundColor: m.role === 'user' ? '#111' : 'transparent', border: m.role === 'user' ? '1px solid #222' : 'none' }}>
              <div style={{ fontSize: '0.7rem', color: m.role === 'user' ? '#0070f3' : '#10a37f', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 'bold' }}>
                {m.role === 'user' ? 'You' : 'Tribit'}
              </div>
              <div style={{ color: '#eee', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                {m.content}
              </div>
            </div>
          ))}
          {isLoading && <div style={{ color: '#10a37f', fontSize: '0.8rem' }}>Tribit is typing...</div>}
          {error && <div style={{ color: '#ff4444', marginTop: '1rem', fontSize: '0.8rem' }}>Error: {error.message}</div>}
          <div ref={scrollRef} />
        </div>
      </main>

      <footer style={{ padding: '1.5rem', borderTop: '1px solid #222', backgroundColor: '#000' }}>
        <form onSubmit={onFormSubmit} style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '0.5rem' }}>
          <input
            value={input || ''} 
            onChange={handleInputChange}
            placeholder="Type a message..."
            style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#111', color: '#fff', outline: 'none' }}
          />
          <button
            type="submit"
            disabled={isLoading || !(input || '').trim()}
            style={{ 
              padding: '0 1.5rem', 
              borderRadius: '8px', 
              border: 'none', 
              backgroundColor: (isLoading || !(input || '').trim()) ? '#222' : '#fff', 
              color: (isLoading || !(input || '').trim()) ? '#555' : '#000', 
              fontWeight: 'bold', 
              cursor: (isLoading || !(input || '').trim()) ? 'default' : 'pointer' 
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </footer>
    </div>
  );
}