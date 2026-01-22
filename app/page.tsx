'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function Chat() {
  // We use our own manual state for the text box
  const [text, setText] = useState('');
  
  // @ts-ignore
  const { messages, append, isLoading, error } = useChat();

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Button clicked. Text in state is:", text);

    if (!text.trim()) {
      alert("Text box is empty!");
      return;
    }

    try {
      // Manual trigger: we tell the SDK to send our manual 'text'
      await append({ role: 'user', content: text });
      setText(''); // Clear the box after sending
    } catch (err: any) {
      console.error("Append error:", err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: 'black' }}>
      <h1>Tribit AI (Manual Mode)</h1>
      
      <div style={{ border: '2px solid black', height: '300px', overflowY: 'auto', padding: '10px', marginBottom: '10px' }}>
        {messages.map((m: any, i: number) => (
          <div key={i} style={{ marginBottom: '10px' }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
        {isLoading && <p style={{ color: 'blue' }}>Thinking...</p>}
      </div>

      <form onSubmit={handleManualSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)} // Direct React state update
          placeholder="Type here..."
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '2px solid black', color: 'black' }}
        />
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
        >
          SEND MESSAGE
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
}