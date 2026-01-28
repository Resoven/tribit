'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  // 1. State for Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // 2. Vercel AI SDK hook for Streaming and Stop functionality
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, stop } = useChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 3. ChatGPT-like Color Palette (Standard for 2026)
  const theme = {
    bg: isDarkMode ? '#0d0d0d' : '#ffffff',
    headerBg: isDarkMode ? 'rgba(13, 13, 13, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    text: isDarkMode ? '#ececec' : '#000000',
    userBubble: isDarkMode ? '#2f2f2f' : '#f4f4f4',
    inputBg: isDarkMode ? '#212121' : '#ffffff',
    borderColor: isDarkMode ? '#333333' : '#e5e5e5',
    aiText: isDarkMode ? '#d1d1d1' : '#374151',
  };

  // 4. Auto-scroll logic for streaming responses
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      backgroundColor: theme.bg, 
      color: theme.text, 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      transition: 'background-color 0.3s ease' 
    }}>
      
      {/* HEADER: Sticky and Responsive */}
      <header style={{ 
        padding: '12px 20px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: `1px solid ${theme.borderColor}`,
        backgroundColor: theme.headerBg,
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>Tribit AI ✨</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '1.2rem', padding: '5px' }}
            title="Toggle Theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button 
            onClick={() => setMessages([])} 
            style={{ 
              padding: '6px 14px', 
              borderRadius: '8px', 
              border: `1px solid ${theme.borderColor}`, 
              background: 'none', 
              color: theme.text, 
              cursor: 'pointer', 
              fontSize: '0.85rem',
              fontWeight: '500'
            }}
          >
            New Chat
          </button>
        </div>
      </header>

      {/* CHAT FEED: Centered with max-width for readability */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', width: '100%', padding: '0 20px' }}>
          {messages.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '20vh', opacity: 0.5 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '500' }}>How can I help you today?</h2>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} style={{ 
              marginBottom: '35px', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: m.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {/* Label */}
              <div style={{ fontWeight: '700', fontSize: '0.75rem', marginBottom: '8px', opacity: 0.6 }}>
                {m.role === 'user' ? 'You' : 'Tribit'}
              </div>

              {/* Message Container */}
              <div style={{ 
                maxWidth: m.role === 'user' ? '85%' : '100%', 
                padding: m.role === 'user' ? '12px 20px' : '0px', 
                borderRadius: '24px', 
                backgroundColor: m.role === 'user' ? theme.userBubble : 'transparent',
                fontSize: '1rem',
                lineHeight: '1.6',
                wordBreak: 'break-word'
              }}>
                <div style={{ color: m.role === 'assistant' ? theme.aiText : 'inherit' }}>
                  <ReactMarkdown>{m.content}</ReactMarkdown>
                </div>

                {/* Copy Button (Only for AI when finished) */}
                {m.role === 'assistant' && !isLoading && (
                  <button 
                    onClick={() => navigator.clipboard.writeText(m.content)}
                    style={{ 
                      background: 'none', border: 'none', cursor: 'pointer', 
                      opacity: 0.4, padding: '10px 0', fontSize: '0.8rem',
                      display: 'flex', alignItems: 'center', gap: '5px'
                    }}
                  >
                    📋 Copy response
                  </button>
                )}
              </div>
            </div>
          ))}
          
          {/* Thinking Indicator */}
          {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
            <div style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>Tribit is typing...</div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* INPUT SECTION: Fixed at bottom, mobile-responsive */}
      <div style={{ padding: '0 20px 30px 20px', backgroundColor: theme.bg }}>
        <form onSubmit={handleSubmit} style={{ 
          maxWidth: '720px', 
          margin: '0 auto', 
          position: 'relative' 
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            backgroundColor: theme.inputBg, 
            borderRadius: '26px', 
            border: `1px solid ${theme.borderColor}`,
            padding: '8px 12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <textarea
              rows={1}
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                // Submit on Enter (if not on mobile)
                if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 768) {
                  e.preventDefault();
                  handleSubmit(e as any);
                }
              }}
              placeholder="Message Tribit..."
              style={{ 
                flex: 1, background: 'none', border: 'none', outline: 'none', 
                color: theme.text, padding: '10px', fontSize: '16px', // 16px prevents iOS zoom
                resize: 'none', maxHeight: '200px', fontFamily: 'inherit'
              }}
            />
            
            {isLoading ? (
              <button type="button" onClick={stop} style={{ 
                width: '32px', height: '32px', borderRadius: '50%', border: 'none', 
                backgroundColor: theme.text, color: theme.bg, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '5px'
              }}>
                <div style={{ width: '10px', height: '10px', background: theme.bg, borderRadius: '1px' }} />
              </button>
            ) : (
              <button 
                type="submit" 
                disabled={!input.trim()} 
                style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', border: 'none', 
                  backgroundColor: input.trim() ? theme.text : (isDarkMode ? '#333' : '#e5e5e5'), 
                  color: theme.bg, cursor: input.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s', marginBottom: '5px', fontSize: '1.2rem'
                }}
              >
                ↑
              </button>
            )}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.7rem', marginTop: '12px', opacity: 0.4 }}>
            Tribit AI is in Direct Mode. Accuracy may vary.
          </p>
        </form>
      </div>
    </div>
  );
}