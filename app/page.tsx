'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({
    onError: (err) => {
      console.error("Chat Error:", err);
      alert("API Error: " + err.message); // This will pop up if the server fails
    },
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: 'black', background: 'white' }}>
      <h1>Tribit AI Chat</h1>
      
      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', marginBottom: '10px', padding: '10px' }}>
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: '10px' }}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
        {isLoading && <p style={{ color: 'gray' }}>Thinking...</p>}
      </div>

      <form onSubmit={(e) => {
        console.log("Submit event triggered");
        handleSubmit(e);
      }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type message here..."
          style={{ width: '80%', padding: '10px', border: '1px solid black', marginBottom: '5px' }}
        />
        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
        >
          SEND MESSAGE
        </button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
    </div>
  );
}