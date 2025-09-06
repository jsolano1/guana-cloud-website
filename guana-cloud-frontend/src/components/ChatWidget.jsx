import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css';
import logoSquare from '../assets/logo-square.png'; // Importa el nuevo logo cuadrado

// --- Componentes de Iconos (sin cambios) ---
const SendIcon = () => ( /* ... (código del icono sin cambios) ... */ );
const BotIcon = () => ( /* ... (código del icono sin cambios) ... */ );

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

  const [messages, setMessages] = useState([]); // Inicia vacío
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Efecto para añadir el mensaje animado una vez que termina
  useEffect(() => {
    if (animatedMessage === initialBotMessage) {
      setMessages([{ from: 'bot', text: animatedMessage }]);
    }
  }, [animatedMessage, initialBotMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => { /* ... (sin cambios en esta función) ... */ };

  return (
    <div className="chat-widget">
      {/* NUEVA CABECERA */}
      <div className="chat-header">
        <img src={logoSquare} alt="Guana Cloud" className="chat-header-logo" />
        <h3 className="chat-header-title">Asistente Virtual Kai</h3>
      </div>
      <div className="messages-area">
        {/* Renderiza el mensaje animado primero */}
        {messages.length === 0 && (
          <div className="message-wrapper bot">
            <div className="bot-icon"><BotIcon /></div>
            <div className="message">{animatedMessage}</div>
          </div>
        )}
        {/* Renderiza el historial completo después */}
        {messages.map((msg, index) => (
          <div key={index} className={`message-wrapper ${msg.from}`}>
            {msg.from === 'bot' && <div className="bot-icon"><BotIcon /></div>}
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
        {/* ... (sin cambios en el JSX del input area) ... */ }
      </div>
    </div>
  );
};

export default ChatWidget;