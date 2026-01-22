// @ts-ignore
const { messages, input, handleInputChange, handleSubmit } = useChat();

return (
  <form onSubmit={handleSubmit}> {/* <--- Ensure onSubmit is here */}
    <input
      value={input}
      onChange={handleInputChange}
      placeholder="Type a message..."
    />
    <button type="submit">Send</button> {/* <--- Must be type="submit" */}
  </form>
);