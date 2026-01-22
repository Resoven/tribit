'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // @ts-ignore
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({
    api: '/api/chat',
    onResponse: (response) => {
      console.log('Received response from API:', response.status);
    },
    onError: (err) => {
      console.error('Chat Error:', err);
    }
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted with input:', input);
    handleSubmit(e);
  };

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>Tribit AI Chat</h1>
        
        <div style={{ marginBottom: '20px', height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', background: '#f9f9f9' }}>
          {messages.length === 0 && <p style={{ color: '#888' }}>No messages yet. Type something below!</p>}
          {messages.map((m) => (
            <div key={m.id} style={{ marginBottom: '15px' }}>
              <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
              <span style={{ whiteSpace: 'pre-wrap' }}>{(m as any).content}</span>
            </div>
          ))}
          {isLoading && <div style={{ color: 'blue' }}>AI is thinking...</div>}
        </div>

        {error && (
          <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red' }}>
            <strong>Error:</strong> {error.message}
          </div>
        )}

        <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            style={{ flexGrow: 1, padding: '10px', border: '2px solid black', color: 'black' }}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: isLoading ? '#ccc' : 'black', 
              color: 'white', 
              border: 'none', 
              cursor: isLoading ? 'not-allowed' : 'pointer' 
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}