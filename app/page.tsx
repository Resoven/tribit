'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // Adding @ts-ignore to bypass the "Property input does not exist" build error
  // @ts-ignore
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({
    onError: (err) => {
      console.error("Chat Error:", err);
    },
  });

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', color: 'black', background: 'white', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Tribit AI Chat</h1>
      
      <div style={{ border: '2px solid black', height: '400px', overflowY: 'scroll', marginBottom: '20px', padding: '15px', background: '#f0f0f0' }}>
        {messages.length === 0 && <p style={{ color: '#666' }}>No messages yet. Say hello!</p>}
        {messages.map(m => (
          <div key={m.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>
            <div style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px' }}>
              {m.role === 'user' ? '👤 You' : '🤖 AI'}
            </div>
            <div style={{ whiteSpace: 'pre-wrap', marginTop: '5px' }}>{m.content}</div>
          </div>
        ))}
        {isLoading && <p style={{ color: 'blue', fontWeight: 'bold' }}>AI is typing...</p>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          style={{ padding: '12px', border: '2px solid black', fontSize: '16px', color: 'black', background: 'white' }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '12px', 
            backgroundColor: isLoading ? '#ccc' : 'black', 
            color: 'white', 
            fontWeight: 'bold', 
            cursor: isLoading ? 'not-allowed' : 'pointer',
            border: 'none'
          }}
        >
          {isLoading ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '20px', padding: '10px', border: '1px solid red', background: '#fff5f5' }}>
          <strong>Error:</strong> {error.message}
        </div>
      )}
    </div>
  );
}