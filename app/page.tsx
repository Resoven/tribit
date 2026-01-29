'use client';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  // Destructure the standard hooks from the AI SDK
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0d0d0d', color: '#ececec', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #333', backgroundColor: '#0d0d0d' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '30px', animation: 'fadeIn 0.3s ease' }}>
              <div style={{ 
                fontWeight: 'bold', 
                fontSize: '0.75rem', 
                color: m.role === 'user' ? '#aaa' : '#10a37f', 
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {m.role === 'user' ? 'You' : 'Tribit'}
              </div>
              <div style={{ 
                lineHeight: '1.6', 
                fontSize: '1rem', 
                color: '#d1d1d1',
                whiteSpace: 'pre-wrap'
              }}>
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{ color: '#555', fontSize: '0.9rem', fontStyle: 'italic' }}>
              Tribit is typing...
            </div>
          )}

          {error && (
            <div style={{ color: '#ff4a4a', padding: '10px', backgroundColor: '#2d0000', borderRadius: '5px', marginTop: '10px' }}>
              Connection Error: {error.message}
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer style={{ padding: '20px', backgroundColor: '#0d0d0d' }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '750px', margin: '0 auto', position: 'relative' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: '#212121', 
            borderRadius: '12px', 
            border: '1px solid #444',
            padding: '4px 12px'
          }}>
            <input 
              value={input} 
              onChange={handleInputChange} 
              placeholder="Message Tribit..." 
              style={{ 
                flex: 1, 
                background: 'none', 
                border: 'none', 
                color: 'white', 
                outline: 'none', 
                padding: '12px 0',
                fontSize: '16px'
              }} 
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()} 
              style={{ 
                background: isLoading || !input.trim() ? '#555' : '#fff', 
                color: '#000', 
                borderRadius: '8px', 
                width: '32px', 
                height: '32px', 
                cursor: 'pointer', 
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>↑</span>
            </button>
          </div>
        </form>
        <p style={{ textAlign: 'center', fontSize: '0.7rem', color: '#555', marginTop: '10px' }}>
          Tribit can make mistakes. Check important info.
        </p>
      </footer>
    </div>
  );
}