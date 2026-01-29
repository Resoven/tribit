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
    if (isMounted && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMounted]);

  if (!isMounted) {
    return <div style={{ backgroundColor: '#0d0d0d', height: '100vh' }} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0d0d0d', color: '#ececec', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #333' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '30px' }}>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '0.75rem', 
                color: m.role === 'user' ? '#aaa' : '#10a37f', 
                marginBottom: '8px',
                textTransform: 'uppercase'
              }}>
                {m.role === 'user' ? 'You' : 'Tribit'}
              </div>
              <div style={{ lineHeight: '1.6', fontSize: '1rem', color: '#d1d1d1' }}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && <div style={{ color: '#555', fontStyle: 'italic' }}>Tribit is typing...</div>}
          {error && <div style={{ color: '#ff4a4a', fontSize: '0.8rem' }}>Error: {error.message}</div>}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '750px', margin: '0 auto' }}>
          <div style={{ display: 'flex', backgroundColor: '#212121', borderRadius: '12px', border: '1px solid #444', padding: '4px 12px' }}>
            <input 
              value={input} 
              onChange={handleInputChange} 
              placeholder="Message Tribit..." 
              autoComplete="off"
              style={{ flex: 1, background: 'none', border: 'none', color: 'white', outline: 'none', padding: '12px', fontSize: '16px' }} 
            />
            <button 
              type="submit" 
              disabled={isLoading || !input?.trim()} 
              style={{ 
                background: (isLoading || !input?.trim()) ? '#555' : '#fff', 
                color: '#000', 
                borderRadius: '8px', 
                padding: '0 15px', 
                cursor: 'pointer', 
                border: 'none',
                fontWeight: 'bold'
              }}
            >
              ↑
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
}