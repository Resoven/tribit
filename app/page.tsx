'use client';

import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

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

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      // Create the TRIBIT bubble
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        
        // This regex cleans the "0:text" format common in AI SDK streams
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('0:')) {
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#000', color: '#fff' }}>
      <header style={{ padding: '20px', textAlign: 'center', borderBottom: '1px solid #333' }}>
        <strong>Tribit AI ✨</strong>
      </header>
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.7rem', opacity: 0.5 }}>{m.role.toUpperCase()}</div>
              <ReactMarkdown>{m.content}</ReactMarkdown>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={sendMessage} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', width: '100%' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message..." style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: '#fff', borderRadius: '10px' }} />
      </form>
    </div>
  );
}