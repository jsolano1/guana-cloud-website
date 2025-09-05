import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css'; // Importamos el archivo de estilos

// --- Componentes de Iconos SVG ---
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const BotIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
     <path d="M12,2A10,10,0,0,0,2,12A10,10,0,0,0,12,22A10,10,0,0,0,22,12A10,10,0,0,0,12,2ZM8.5,12.5A1.5,1.5,0,1,1,10,11A1.5,1.5,0,0,1,8.5,12.5ZM15.5,12.5A1.5,1.5,0,1,1,14,11A1.5,1.5,0,0,1,15.5,12.5Z"/>
  </svg>
);


// --- Componente Principal del Widget de Chat ---
const ChatWidget = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hola, soy el asistente de IA de Guana Cloud. ¿Cómo puedo ayudarte con tus desafíos de datos, nube o IA?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botApiUrl = `${import.meta.env.VITE_BOT_API_URL}/ask`;
      const response = await fetch(botApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage.text })
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const botMessage = { from: 'bot', text: data.answer || "No he recibido una respuesta válida." };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Error al contactar al asistente de IA:", error);
      const errorMessage = { 
        from: 'bot', 
        text: 'Disculpa, estoy experimentando dificultades técnicas. Por favor, intenta de nuevo más tarde.' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-widget">
      <div className="messages-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.from}`}>
            {msg.from === 'bot' && (
              <div className="bot-icon">
                <BotIcon />
              </div>
            )}
            <div className="message">{msg.text}</div>
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
          placeholder="Pregúntame sobre IA y datos..."
          disabled={isLoading}
          aria-label="Escribe tu consulta aquí"
        />
        <button onClick={handleSend} disabled={isLoading} aria-label="Enviar mensaje">
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;