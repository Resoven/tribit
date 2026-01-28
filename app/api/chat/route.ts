'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  if (!mounted) return null;

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!response.ok) throw new Error('Network error');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('0:')) {
            // Clean the "0:..." wrapper from the AI SDK stream
            const content = line.slice(line.indexOf('"') + 1, line.lastIndexOf('"'));
            assistantText += content.replace(/\\n/g, '\n');
          }
        }

        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = assistantText;
          return updated;
        });
      }
    } catch (err) {
      console.error(err);
      alert("System Error: Could not reach TRIBIT.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0d0d0d', color: '#ececec', fontFamily: 'sans-serif' }}>
      <header style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #333' }}>
        <strong>Tribit AI ✨</strong>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: '25px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.7rem', opacity: 0.5, marginBottom: '5px' }}>
                {m.role === 'user' ? 'YOU' : 'TRIBIT'}
              </div>
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={sendMessage} style={{ padding: '20px', maxWidth: '700px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', gap: '10px', backgroundColor: '#212121', padding: '12px', borderRadius: '15px', border: '1px solid #444' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Tribit..."
            style={{ flex: 1, background: 'none', border: 'none', color: 'white', outline: 'none', fontSize: '16px' }}
          />
          <button type="submit" disabled={isLoading} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}>
            {isLoading ? '...' : '↑'}
          </button>
        </div>
      </form>
    </div>
  );
}