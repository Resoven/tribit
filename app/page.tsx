'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // @ts-ignore
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat();

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button was clicked!");
    // This alert will prove if the JS is alive
    if (!input) {
      alert("Please type something first!");
      return;
    }
    handleSubmit(e);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', background: 'white', color: 'black' }}>
      <h1 style={{ marginBottom: '20px' }}>Tribit AI Chat</h1>
      
      <div style={{ border: '2px solid #000', height: '300px', overflowY: 'auto', marginBottom: '20px', padding: '10px' }}>
        {messages.map((m: any) => (
          <div key={m.id} style={{ margin: '10px 0' }}>
            <strong>{m.role}: </strong>{m.content}
          </div>
        ))}
        {isLoading && <p>AI is thinking...</p>}
      </div>

      <form onSubmit={handleManualSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type here..."
          style={{ 
            width: '100%', 
            padding: '15px', 
            fontSize: '16px', 
            border: '2px solid blue', // Blue border to make it obvious
            marginBottom: '10px',
            color: 'black'
          }}
        />
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '15px', 
            backgroundColor: 'blue', 
            color: 'white', 
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          SEND MESSAGE
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
}