'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // @ts-ignore
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat();

  return (
    <div style={{ backgroundColor: 'white', color: 'black', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ borderBottom: '2px solid black', paddingBottom: '10px' }}>Tribit AI Chat</h1>
        
        {/* Message Display Area */}
        <div style={{ marginBottom: '20px', height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', background: '#f9f9f9' }}>
          {messages.length === 0 && <p style={{ color: '#888' }}>No messages yet.</p>}
          {messages.map((m: any) => (
            <div key={m.id} style={{ marginBottom: '15px' }}>
              <strong>{m.role === 'user' ? 'You: ' : 'AI: '}</strong>
              <span style={{ whiteSpace: 'pre-wrap' }}>{m.content}</span>
            </div>
          ))}
          {isLoading && <div style={{ color: 'blue', marginTop: '10px' }}>AI is thinking...</div>}
        </div>

        {/* Error Message if any */}
        {error && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            Error: {error.message}
          </div>
        )}

        {/* The Chat Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
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
              cursor: 'pointer' 
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}