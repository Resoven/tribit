'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useEffect } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  
  // @ts-ignore
  const { messages, input, setInput, handleSubmit, isLoading, error } = useChat();

  // This "syncs" our manual text state with the AI SDK's internal state
  useEffect(() => {
    setInput(text);
  }, [text, setInput]);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: 'black', background: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '22px' }}>Tribit AI</h1>
      
      <div style={{ border: '2px solid black', height: '400px', overflowY: 'auto', padding: '15px', margin: '20px 0', background: '#f9f9f9' }}>
        {messages.length === 0 && <p style={{ color: '#888' }}>Ready for your first message...</p>}
        {messages.map((m: any, i: number) => (
          <div key={i} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>{m.role}</div>
            <div style={{ marginTop: '4px' }}>{m.content}</div>
          </div>
        ))}
        {isLoading && <p style={{ color: 'blue' }}>AI is writing...</p>}
      </div>

      <form onSubmit={(e) => {
        handleSubmit(e);
        setText(''); // Clear our manual state on submit
      }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          style={{ 
            width: '100%', 
            padding: '12px', 
            marginBottom: '10px', 
            border: '2px solid black', 
            color: 'black',
            background: 'white'
          }}
        />
        <button 
          type="submit" 
          disabled={isLoading || !text.trim()}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: (isLoading || !text.trim()) ? '#ccc' : 'black', 
            color: 'white', 
            fontWeight: 'bold',
            cursor: 'pointer',
            border: 'none'
          }}
        >
          {isLoading ? 'THINKING...' : 'SEND MESSAGE'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '10px', padding: '10px', border: '1px solid red' }}>
          <strong>Error:</strong> {error.message}
        </div>
      )}
    </div>
  );
}