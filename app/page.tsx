'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // We use "as any" here to stop the TypeScript build error you see in your logs
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({
    onError: (err) => {
      console.error("Chat Error:", err);
    },
  }) as any;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', background: 'white', color: 'black', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Tribit AI</h1>
      
      <div style={{ border: '2px solid black', height: '400px', overflowY: 'auto', marginBottom: '20px', padding: '15px', background: '#f9f9f9' }}>
        {messages.map((m: any) => (
          <div key={m.id} style={{ marginBottom: '15px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#555' }}>
              {m.role === 'user' ? 'YOU' : 'AI'}
            </div>
            <div style={{ marginTop: '4px' }}>{m.content}</div>
          </div>
        ))}
        {isLoading && <p style={{ color: 'blue' }}>AI is typing...</p>}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          style={{ 
            flexGrow: 1, 
            padding: '12px', 
            border: '2px solid black',
            color: 'black',
            background: 'white'
          }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '0 20px', 
            backgroundColor: 'black', 
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isLoading ? '...' : 'SEND'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '10px', padding: '10px', border: '1px solid red', background: '#fff5f5' }}>
          {error.message}
        </div>
      )}
    </div>
  );
}