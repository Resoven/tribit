'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  
  // Using "as any" to bypass the version mismatch errors in your environment
  const chatHelpers = useChat({
    api: '/api/chat',
    // Safety fallback: if the library is confused, these defaults help
    initialInput: '',
  } as any) as any;

  // We extract these specifically to use in the form
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = chatHelpers;
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // This ensures the page is ready before showing the UI
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-scroll logic
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
          {messages && messages.map((m: any) => (
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
            // Final safety check before sending
            if (input && input.trim() !== '' && !isLoading) {
              handleSubmit(e);
            }
          }} 
          style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', gap: '10px' }}
        >
          <input
            autoFocus
            autoComplete="off"
            // If 'input' is undefined from the hook, we use an empty string so it stays "unlocked"
            value={input || ''} 
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
            disabled={isLoading || !input || input.trim() === ''}
            style