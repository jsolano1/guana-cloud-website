import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';
import logoSquare from '../assets/logo-square.png'; // Importa el nuevo logo cuadrado

// --- Componentes de Iconos (Código completo) ---
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

// --- Hook Personalizado para el efecto de escritura ---
const useTypingEffect = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

// --- Componente Principal del Widget de Chat ---
const ChatWidget = () => {
  const initialBotMessage = 'Hola, soy el asistente de IA de Guana Cloud. ¿Cómo puedo ayudarte con tus desafíos de datos, nube o IA?';
  const animatedMessage = useTypingEffect(initialBotMessage);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (animatedMessage === initialBotMessage) {
      setMessages([{ from: 'bot', text: animatedMessage }]);
    }
  }, [animatedMessage, initialBotMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => { /* ... (sin cambios en la lógica de envío) ... */ };

  return (
    <div className="chat-widget">
      <div className="chat-header">
        <img src={logoSquare} alt="Guana Cloud" className="chat-header-logo" />
        <h3 className="chat-header-title">Asistente Virtual Kai</h3>
      </div>
      <div className="messages-area">
        {messages.length === 0 && (
          <div className="message-wrapper bot">
            <div className="bot-icon"><BotIcon /></div>
            <div className="message">{animatedMessage}</div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.from}`}>
            {msg.from === 'bot' && <div className="bot-icon"><BotIcon /></div>}
            <div className="message">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message-wrapper bot">
            {/* ... (código del indicador de escritura sin cambios) ... */}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && !isLoading && handleSend()} placeholder="Pregúntame sobre IA y datos..." disabled={isLoading} />
        <button onClick={handleSend} disabled={isLoading}><SendIcon /></button>
      </div>
    </div>
  );
};

export default ChatWidget;