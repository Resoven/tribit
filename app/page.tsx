'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  
  // We use a fallback empty string for 'input' to prevent the .trim() crash
  const { messages = [], input = '', handleInputChange, handleSubmit, isLoading = false } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (messages?.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Safety: If not mounted or variables are missing, show a loading shell
  if (!mounted) return <div style={{ background: '#0d0d0d', height: '100vh' }} />;

  const isInputEmpty = !input || input.trim().length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0d0d0d', color: '#ececec', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #333', background: '#0d0d0d' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '20vh', opacity: 0.3 }}>
              <h1>How can I help?</h1>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '25px', textAlign: 'left' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.8rem', marginBottom: '5px', opacity: 0.5 }}>
                {m.role === 'user' ? 'YOU' : 'TRIBIT'}
              </div>
              <div style={{ 
                padding: '5px 0', 
                lineHeight: '1.6',
                color: m.role === 'user' ? '#fff' : '#ccc'
              }}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ padding: '20px', background: '#0d0d0d' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            backgroundColor: '#212121', 
            padding: '12px', 
            borderRadius: '15px',
            border: '1px solid #333'
          }}>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Message Tribit..."
              style={{ flex: 1, background: 'none', border: 'none', color: 'white', outline: 'none', fontSize: '16px' }}
            />
            <button 
              type="submit" 
              disabled={isLoading || isInputEmpty}
              style={{ 
                backgroundColor: (isInputEmpty || isLoading) ? '#444' : '#fff', 
                color: '#000', 
                border: 'none', 
                borderRadius: '50%', 
                width: '32px', 
                height: '32px', 
                cursor: (isInputEmpty || isLoading) ? 'default' : 'pointer',
                fontWeight: 'bold',
                transition: 'background 0.2s'
              }}
            >
              {isLoading ? '...' : '↑'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}