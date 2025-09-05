import React, { useState, useEffect, useRef } from 'react';
import './ChatWidget.css'; // Asumimos que tendrás un archivo CSS para los estilos

// --- Componentes de Iconos SVG ---
// Separar los iconos en sus propios componentes mejora la legibilidad del JSX principal.

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
  // --- Estados del Componente ---
  // 'messages' almacena el historial de la conversación.
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hola, soy el asistente de IA de Guana Cloud. ¿Cómo puedo ayudarte con tus desafíos de datos, nube o IA?' }
  ]);
  
  // 'input' almacena el valor actual del campo de texto del usuario.
  const [input, setInput] = useState('');
  
  // 'isLoading' controla el estado de carga para mostrar el indicador "escribiendo...".
  const [isLoading, setIsLoading] = useState(false);

  // --- Referencias y Efectos ---
  // 'messagesEndRef' es una referencia a un elemento al final de la lista de mensajes.
  // La usamos para hacer scroll automático hacia el último mensaje.
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Este efecto se ejecuta cada vez que el array 'messages' cambia.
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  // --- Manejador de Eventos ---
  // 'handleSend' se encarga de toda la lógica de envío de mensajes.
  const handleSend = async () => {
    // Evita enviar mensajes vacíos.
    if (!input.trim()) {
      return;
    }

    const userMessage = { from: 'user', text: input };
    
    // Actualiza el estado para mostrar inmediatamente el mensaje del usuario y limpiar el input.
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Obtenemos la URL de la API desde las variables de entorno de Vite.
      // Esto permite tener diferentes URLs para desarrollo y producción.
      const botApiUrl = `${import.meta.env.VITE_BOT_API_URL}/ask`;

      const response = await fetch(botApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage.text })
      });

      // Si la respuesta del servidor no es exitosa (ej. error 500), lanzamos un error.
      if (!response.ok) {
        throw new Error(`Error en la respuesta de la API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const botMessage = { from: 'bot', text: data.answer };

      // Actualizamos el estado con la respuesta del bot.
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      // Si ocurre cualquier error en el proceso (red, API, etc.), lo capturamos.
      console.error("Error al contactar al asistente de IA:", error);
      const errorMessage = { 
        from: 'bot', 
        text: 'Disculpa, estoy experimentando dificultades técnicas en este momento. Por favor, intenta de nuevo más tarde.' 
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      // Este bloque se ejecuta siempre, haya habido éxito o error.
      // Nos aseguramos de quitar el estado de carga.
      setIsLoading(false);
    }
  };

  // --- Renderizado del Componente ---
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
        
        {/* Este div invisible es el objetivo del auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          placeholder="Pregúntame sobre IA para finanzas..."
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