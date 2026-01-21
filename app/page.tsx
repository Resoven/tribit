export default function Page() {
  return (
    <div style={{ 
      background: 'red', 
      color: 'white', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <h1>If you see this RED screen, the server is working!</h1>
    </div>
  );
}