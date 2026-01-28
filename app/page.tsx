'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    // This will help us see errors even if the network tab clears
    onError: (err) => {
      console.error("SDK Error:", err);
      alert("AI Error: " + err.message);
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ padding: '20px', backgroundColor: '#0d0d0d', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', paddingBottom: '100px' }}>
        <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>Tribit AI</h2>
        
        <div style={{ marginTop: '20px' }}>
          {messages.map(m => (
            <div key={m.id} style={{ marginBottom: '20px', padding: '10px', borderRadius: '8px', backgroundColor: m.role === 'user' ? '#222' : 'transparent' }}>
              <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '4px' }}>
                {m.role === 'user' ? 'YOU' : 'TRIBIT'}
              </div>
              {m.content}
            </div>
          ))}
          {isLoading && <div style={{ color: '#888' }}>Tribit is thinking...</div>}
        </div>

        {/* The form handler must prevent the default browser reload */}
        <form 
          onSubmit={(e) => {
            e.preventDefault(); 
            handleSubmit(e);
          }} 
          style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '700px', display: 'flex', gap: '10px', backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '15px', border: '1px solid #333' }}
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Write a message..."
            style={{ flex: 1, background: 'none', border: 'none', color: '#fff', outline: 'none', fontSize: '16px' }}
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            style={{ padding: '8px 20px', borderRadius: '10px', backgroundColor: input.trim() ? '#fff' : '#444', color: '#000', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}