'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // We pull setInput specifically to bypass the internal handleInputChange
  const { messages = [], input = '', setInput, handleSubmit, isLoading = false } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (messages?.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!mounted) return <div style={{ background: '#0d0d0d', height: '100vh' }} />;

  const theme = {
    bg: isDarkMode ? '#0d0d0d' : '#ffffff',
    text: isDarkMode ? '#ececec' : '#1a1a1a',
    inputBg: isDarkMode ? '#212121' : '#f4f4f4',
    border: isDarkMode ? '#333' : '#e5e5e5'
  };

  const isInputEmpty = !input || input.trim().length === 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: theme.bg, color: theme.text, fontFamily: 'sans-serif', transition: 'all 0.2s' }}>
      <header style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${theme.border}` }}>
        <strong>Tribit AI ✨</strong>
        <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '25px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.7rem', marginBottom: '5px', opacity: 0.5 }}>
                {m.role === 'user' ? 'YOU' : 'TRIBIT'}
              </div>
              <div style={{ lineHeight: '1.6' }}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', gap: '10px', backgroundColor: theme.inputBg, 
            padding: '12px', borderRadius: '15px', border: `1px solid ${theme.border}` 
          }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)} // Direct state update
              placeholder="Message Tribit..."
              style={{ flex: 1, background: 'none', border: 'none', color: theme.text, outline: 'none', fontSize: '16px' }}
            />
            <button 
              type="submit" 
              disabled={isLoading || isInputEmpty}
              style={{ 
                backgroundColor: (isInputEmpty || isLoading) ? '#666' : theme.text, 
                color: theme.bg, 
                border: 'none', borderRadius: '50%', width: '32px', height: '32px', 
                cursor: (isInputEmpty || isLoading) ? 'default' : 'pointer',
                fontWeight: 'bold'
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