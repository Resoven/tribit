'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useRef, useEffect, useState } from 'react';

export default function Chat() {
  const [isMounted, setIsMounted] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  useEffect(() => {
    setIsMounted(true);
    console.log("UI Mounted. Input value is:", input);
  }, []);

  if (!isMounted) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff' }}>
      <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: '10px' }}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </main>

      <footer style={{ padding: '20px', borderTop: '1px solid #333' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', maxWidth: '600px', margin: '0 auto' }}>
          <input
            // REMOVED 'value={input}' TEMPORARILY TO TEST TYPING
            onChange={handleInputChange}
            placeholder="Type anything here..."
            autoFocus
            style={{ 
              flex: 1, 
              padding: '12px', 
              backgroundColor: '#fff', // White background so you can see the cursor
              color: '#000', 
              borderRadius: '8px',
              border: '2px solid yellow' // High visibility for testing
            }}
          />
          <button 
            type="submit" 
            // REMOVED DISABLED ATTRIBUTE ENTIRELY
            style={{ 
              padding: '12px 20px', 
              backgroundColor: 'green', 
              color: '#fff', 
              borderRadius: '8px', 
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            SEND NOW
          </button>
        </form>
      </footer>
    </div>
  );
}