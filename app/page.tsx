'use client';

import { useChat } from '@ai-sdk/react';

export default function Chat() {
  // @ts-ignore
  const { messages, input, handleInputChange, handleSubmit, error, isLoading } = useChat({
    onError: (err) => {
      console.error("Chat Error:", err);
      alert("AI Error: " + err.message);
    },
  });

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button clicked. Current input value:", input);
    
    // This check ensures we don't send empty strings to OpenAI
    if (!input || input.trim() === "") {
      console.log("Input was empty, blocking submit.");
      return;
    }
    
    handleSubmit(e);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', background: 'white', color: 'black', minHeight: '100vh' }}>
      <h1 style={{ borderBottom: '2px solid black' }}>Tribit AI</h1>
      
      <div style={{ border: '1px solid #000', height: '400px', overflowY: 'auto', margin: '20px 0', padding: '15px' }}>
        {messages.map((m: any) => (
          <div key={m.id} style={{ marginBottom: '15px' }}>
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong>
            <p style={{ margin: '5px 0' }}>{m.content}</p>
          </div>
        ))}
        {isLoading && <p style={{ color: 'blue' }}>AI is typing...</p>}
      </div>

      <form onSubmit={handleManualSubmit}>
        <input
          value={input || ''} // Ensure it's never undefined
          onChange={handleInputChange}
          placeholder="Write your message..."
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
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '12px', 
            backgroundColor: 'black', 
            color: 'white',
            cursor: 'pointer' 
          }}
        >
          {isLoading ? 'THINKING...' : 'SEND'}
        </button>
      </form>

      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error.message}</div>}
    </div>
  );
}