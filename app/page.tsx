'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  
  // Explicitly defining the API route here is safer for Next.js 15
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  // Prevents hydration mismatch which causes the "Application Error"
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ padding: '20px', backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center' }}>Tribit AI</h1>
        
        <div style={{ marginBottom: '100px' }}>
          {messages.map(m => (
            <div key={m.id} style={{ marginBottom: '10px', color: m.role === 'user' ? '#fff' : '#00ff00' }}>
              <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
              {m.content}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ position: 'fixed', bottom: '20px', width: '100%', maxWidth: '600px', display: 'flex', gap: '10px' }}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #333', background: '#222', color: '#fff' }}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#fff', color: '#000', cursor: 'pointer' }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}