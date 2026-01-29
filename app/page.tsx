// Inside your sendMessage function in app/page.tsx

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value, { stream: true });
  const lines = chunk.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // 1. Check for AI SDK Text Protocol (starts with 0:)
    if (trimmedLine.startsWith('0:')) {
      try {
        // Find the text inside the quotes: 0:"content"
        const firstQuote = trimmedLine.indexOf('"');
        const lastQuote = trimmedLine.lastIndexOf('"');
        if (firstQuote !== -1 && lastQuote > firstQuote) {
          const content = trimmedLine.slice(firstQuote + 1, lastQuote);
          // Unescape newlines sent by the API
          assistantText += content.replace(/\\n/g, '\n');
        }
      } catch (e) {
        console.error("Parsing error", e);
      }
    } 
    // 2. Raw Fallback: If it's not a protocol line but has text, show it!
    else if (!trimmedLine.includes(':') && trimmedLine.length > 0) {
      assistantText += trimmedLine;
    }
  }

  // Update the UI
  setMessages(prev => {
    const updated = [...prev];
    if (updated.length > 0 && updated[updated.length - 1].role === 'assistant') {
      updated[updated.length - 1].content = assistantText;
    }
    return updated;
  });
}