<div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
  <div style={{ maxWidth: '700px', margin: '0 auto' }}>
    {messages.map((m, i) => (
      <div key={i} style={{ 
        marginBottom: '25px', 
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: m.role === 'assistant' ? '#1a1a1a' : 'transparent' 
      }}>
        <div style={{ fontWeight: 'bold', fontSize: '0.7rem', color: '#00ff00', marginBottom: '5px' }}>
          {m.role === 'user' ? 'YOU' : 'TRIBIT'}
        </div>
        
        {/* WE SWAP MARKDOWN FOR A PRE TAG TO SEE THE RAW DATA FIRST */}
        <pre style={{ 
          whiteSpace: 'pre-wrap', 
          color: '#ffffff', 
          fontSize: '16px',
          fontFamily: 'inherit'
        }}>
          {m.content || (isLoading && i === messages.length - 1 ? 'Typing...' : '[Empty Response]')}
        </pre>
      </div>
    ))}
    <div ref={messagesEndRef} />
  </div>
</div>