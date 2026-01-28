'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // useChat automatically handles the streaming state and messages array
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, stop } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const theme = {
    bg: isDarkMode ? '#0d0d0d' : '#ffffff',
    headerBg: isDarkMode ? 'rgba(13, 13, 13, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    text: isDarkMode ? '#ececec' : '#000000',
    userBubble: isDarkMode ? '#2f2f2f' : '#f4f4f4',
    inputBg: isDarkMode ? '#212121' : '#ffffff',
    borderColor: isDarkMode ? '#333333' : '#e5e5e5',
    aiText: isDarkMode ? '#d1d1d1' : '#374151',
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', height: '100vh', 
      backgroundColor: theme.bg, color: theme.text, 
      fontFamily: '-apple-system, system-ui, sans-serif',
      transition: 'background-color 0.3s ease' 
    }}>
      
      <header style={{ 
        padding: '12px 20px', display: 'flex', justifyContent: 'space-between', 
        alignItems: 'center', borderBottom: `1px solid ${theme.borderColor}`,
        backgroundColor: theme.headerBg, backdropFilter: 'blur(10px)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Tribit AI ✨</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem' }}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setMessages([])} style={{ padding: '6px 14px', borderRadius: '8px', border: `1px solid ${theme.borderColor}`, background: 'none', color: theme.text, cursor: 'pointer', fontSize: '0.85rem' }}>
            New Chat
          </button>
        </div>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '20vh', opacity: 0.5 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '500' }}>How can I help you today?</h2>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} style={{ 
              marginBottom: '35px', display: 'flex', flexDirection: 'column',
              alignItems: m.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{ fontWeight: '700', fontSize: '0.75rem', marginBottom: '8px', opacity: 0.6 }}>
                {m.role === 'user' ? 'You' : 'Tribit'}
              </div>

              <div style={{ 
                maxWidth: m.role === 'user' ? '85%' : '100%', 
                padding: m.role === 'user' ? '12px 20px' : '0px', 
                borderRadius: '24px', 
                backgroundColor: m.role === 'user' ? theme.userBubble : 'transparent',
                lineHeight: '1.6'
              }}>
                <div style={{ color: m.role === 'assistant' ? theme.aiText : 'inherit' }} className="prose">
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ padding: '0 20px 30px 20px', backgroundColor: theme.bg }}>
        <form onSubmit={handleSubmit} style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', alignItems: 'flex-end', backgroundColor: theme.inputBg, 
            borderRadius: '26px', border: `1px solid ${theme.borderColor}`, padding: '8px 12px'
          }}>
            <textarea
              rows={1}
              value={input}
              onChange={handleInputChange}
              placeholder="Message Tribit..."
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: theme.text, padding: '10px', fontSize: '16px', resize: 'none' }}
            />
            <button type="submit" disabled={!input?.trim() || isLoading} style={{ 
              width: '32px', height: '32px', borderRadius: '50%', border: 'none', 
              backgroundColor: input?.trim() ? theme.text : '#ccc', color: theme.bg, cursor: 'pointer'
            }}>
              {isLoading ? '...' : '↑'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}