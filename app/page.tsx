'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMounted]);

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000000', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '15px', borderBottom: '1px solid #333', textAlign: 'center' }}>
        <strong>Tribit AI ✨</strong>
        {isLoading && <span style={{ marginLeft: '10px', fontSize: '10px', color: '#10a37f' }}>● Streaming...</span>}
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '25px', padding: '10px', borderRadius: '8px', backgroundColor: m.role === 'user' ? '#1a1a1a' : 'transparent' }}>
              <div style={{ fontWeight: 'bold', color: m.role === 'user' ? '#0070f3' : '#10a37f', marginBottom: '4px' }}>
                {m.role === 'user' ? 'YOU' : 'TRIBIT'}
              </div>
              <div style={{ color: '#ffffff', fontSize: '15px', lineHeight: '1.5' }}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer style={{ padding: '20px', borderTop: '1px solid #333' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', gap: '10px' }}>
          <input 
            value={input} 
            onChange={handleInputChange} 
            placeholder="Type your message..." 
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderRadius: '8px', 
              border: '1px solid #444', 
              backgroundColor: '#111', 
              color: 'white',
              outline: 'none'
            }} 
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            style={{ 
              padding: '0 20px', 
              borderRadius: '8px', 
              backgroundColor: isLoading ? '#333' : '#fff', 
              color: '#000', 
              fontWeight: 'bold',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Send
          </button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center', fontSize: '12px' }}>{error.message}</p>}
      </footer>
    </div>
  );
}