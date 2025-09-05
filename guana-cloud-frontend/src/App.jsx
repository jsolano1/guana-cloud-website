import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Crearemos este archivo para los estilos

// --- Iconos SVG para una apariencia más profesional ---
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z" fill="currentColor"/>
  </svg>
);

const BotIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2ZM8.5,12.5A1.5,1.5,0,1,1,10,11A1.5,1.5,0,0,1,8.5,12.5ZM15.5,12.5A1.5,1.5,0,1,1,14,11A1.5,1.5,0,0,1,15.5,12.5Z"/>
  </svg>
);


// --- Componente del Asistente de IA ---
const ChatWidget = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hola, soy el asistente de IA de Guana Cloud. ¿En qué desafío de datos o nube puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Efecto para hacer scroll automático al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botApiUrl = 'https://kai-api-dev-537990588927.us-central1.run.app/ask';

      const response = await fetch(botApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      const botMessage = { from: 'bot', text: data.answer };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error al contactar al asistente de IA:", error);
      const errorMessage = { from: 'bot', text: 'Disculpa, estoy experimentando dificultades técnicas. Por favor, intenta de nuevo en un momento.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      <div className="messages-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.from}`}>
            {msg.from === 'bot' && <div className="bot-icon"><BotIcon /></div>}
            <div className={`message`}>{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper bot">
            <div className="bot-icon"><BotIcon /></div>
            <div className="message typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder="Pregúntame sobre IA para finanzas, migración a la nube..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};


// --- Componente Principal de la Aplicación ---
function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Guana Cloud</h1>
        <nav>
          <a href="#services">Servicios</a>
          <a href="#contact">Contacto</a>
        </nav>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-text">
            <h2>Inteligencia Artificial de Alta Confianza para el Sector Financiero</h2>
            <p>Transformamos tus datos en tu activo más valioso. Interactúa con nuestro asistente de IA y descubre el potencial que podemos desbloquear.</p>
          </div>
          <div className="hero-chat">
            <ChatWidget />
          </div>
        </section>

        {/* Aquí puedes agregar las otras secciones de tu landing page */}
        <section id="services" className="placeholder-section">
          <h2>Nuestros Servicios</h2>
          <p>Próximamente: Casos de éxito y detalle de nuestras soluciones en Data, BI y Cloud.</p>
        </section>
      </main>

      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Guana Cloud. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;