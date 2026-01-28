'use client';

export const dynamic = 'force-dynamic';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  const [localInput, setLocalInput] = useState('');
  
  // EXPLICIT API PATH: This prevents the "u is not a function" error
  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error("Chat Hook Error:", error);
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!mounted) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!localInput.trim() || isLoading) return;

    const val = localInput;
    setLocalInput('');

    try {
      await append({ role: 'user', content: val });
    } catch (err) {
      console.error("Manual Append Crash:", err);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0d0d0d', color: '#ececec' }}>
      <header style={{ padding: '15px', borderBottom: '1px solid #333', textAlign: 'center' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {messages?.map((m) => (
            <div key={m.id} style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.8rem', opacity: 0.5 }}>{m.role === 'user' ? 'YOU' : 'TRIBIT'}</div>
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <form onSubmit={handleSend} style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', gap: '10px', backgroundColor: '#212121', padding: '10px', borderRadius: '15px' }}>
          <input
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Type a message..."
            style={{ flex: 1, background: 'none', border: 'none', color: 'white', outline: 'none' }}
          />
          <button type="submit" disabled={isLoading || !localInput.trim()} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>
            ↑
          </button>
        </form>
      </div>
    </div>
  );
}