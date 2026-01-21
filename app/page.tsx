'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from 'react';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  // This prevents the "Blank Page" hydration error
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{color: 'black', padding: '20px'}}>Loading Tribit...</div>;

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ borderBottom: '1px solid #ccc' }}>Tribit AI</h1>
      
      <div style={{ paddingBottom: '100px' }}>
        {messages.map(m => (
          <div key={m.id} style={{ margin: '10px 0', padding: '10px', background: '#f4f4f4', borderRadius: '5px' }}>
            <strong>{m.role === 'user' ? 'User: ' : 'AI: '}</strong>
            {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: '20px', background: 'white', borderTop: '1px solid #ccc' }}>
        <input
          style={{ width: '100%', maxWidth: '500px', padding: '10px', borderRadius: '5px', border: '1px solid #333', color: 'black' }}
          value={input}
          placeholder="Type a message..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}