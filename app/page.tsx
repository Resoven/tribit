'use client';

import { useState } from 'react';

export default function Chat() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!text.trim()) return;
    
    console.log("Sending manually:", text);
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Failed to connect to AI');

      const data = await response.text(); // Assuming simple text response for now
      setMessages([...newMessages, { role: 'assistant', content: data }]);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Error: Could not reach the AI. Check your API route.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', background: 'white', color: 'black' }}>
      <h1>Tribit AI (Direct Mode)</h1>
      
      <div style={{ border: '2px solid black', height: '400px', overflowY: 'auto', marginBottom: '20px', padding: '15px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: '15px' }}>
            <strong>{m.role === 'user' ? 'YOU' : 'AI'}:</strong>
            <p>{m.content}</p>
          </div>
        ))}
        {isLoading && <p style={{ color: 'blue' }}>AI is thinking...</p>}
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type here..."
          style={{ flexGrow: 1, padding: '12px', border: '2px solid black', color: 'black' }}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          style={{ padding: '0 20px', backgroundColor: 'black', color: 'white', cursor: 'pointer' }}
        >
          {isLoading ? '...' : 'SEND'}
        </button>
      </div>
    </div>
  );
}