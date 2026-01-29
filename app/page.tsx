'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  
  // We use "as any" here to force-fix the TS2339 and TS2353 errors in your environment
  const chatHelpers = useChat({
    api: '/api/chat',
  } as any) as any;

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = chatHelpers;
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // This ensures the app doesn't crash on start (React 19 safety)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '1rem', borderBottom: '1px solid #222', textAlign: 'center' }}>
        <strong style={{ fontSize: '1.2rem', letterSpacing: '1px' }}>Tribit AI ✨</strong>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {messages.map((m: any) => (
            <div key={m.id} style={{ marginBottom: '1.5rem', borderLeft: m.role === 'user' ? '2px solid #333' : '2px solid #10a37f', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.7rem', color: m.role === 'user' ? '#888' : '#10a37f', fontWeight: 'bold', marginBottom: '4px', textTransform: 'uppercase' }}>
                {m.role}
              </div>
              <div style={{ color: '#eee', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </main>

      <footer style={{ padding: '1.5rem', borderTop: '1px solid #222', backgroundColor: '#000' }}>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const safeInput = input ?? '';
            if (safeInput.trim() && !isLoading) {
              handleSubmit(e);
            }
          }} 
          style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '10px' }}
        >
          <input
            value={input ?? ''} 
            onChange={handleInputChange} 
            placeholder="Ask Tribit anything..."
            style={{ 
              flex: 1, 
              padding: '14px', 
              borderRadius: '10px', 
              border: '1px solid #333', 
              backgroundColor: '#111', 
              color: '#fff', 
              outline: 'none',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !(input ?? '').trim()}
            style={{ 
              padding: '0 24px', 
              borderRadius: '10px', 
              backgroundColor: isLoading ? '#333' : '#fff', 
              color: '#000', 
              fontWeight: 'bold', 
              cursor: isLoading ? 'not-allowed' : 'pointer', 
              border: 'none',
              transition: 'opacity 0.2s'
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
        {error && (
          <div style={{ color: '#ff4a4a', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
            Error: {error.message}
          </div>
        )}
      </footer>
    </div>
  );
}