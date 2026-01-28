'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Force sync with browser
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // If we aren't in the browser yet, show a simple loading state
  if (!mounted) return <div style={{ background: '#000', height: '100vh' }} />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0d0d0d', color: '#ececec', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #333' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '20px', textAlign: m.role === 'user' ? 'right' : 'left' }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '10px 15px', 
                borderRadius: '15px', 
                backgroundColor: m.role === 'user' ? '#2f2f2f' : 'transparent',
                maxWidth: '80%',
                textAlign: 'left'
              }}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '720px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', gap: '10px', backgroundColor: '#212121', padding: '10px', borderRadius: '15px' }}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            style={{ flex: 1, background: 'none', border: 'none', color: 'white', outline: 'none' }}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            style={{ 
              backgroundColor: input.trim() ? '#fff' : '#555', 
              color: '#000', 
              border: 'none', 
              borderRadius: '50%', 
              width: '30px', 
              height: '30px', 
              cursor: 'pointer' 
            }}
          >
            ↑
          </button>
        </div>
      </form>
    </div>
  );
}