/* Este es el código correcto para src/components/ChatWidget.css */

:root {
  --chat-bg: #1E1F22;
  --user-bubble-bg: #373A40;
  --bot-bubble-bg: #2A2D31;
  --input-bg: #2A2D31;
  --text-primary: #F0F0F0;
  --text-secondary: #B0B0B0;
  --accent-color: #00A9E0;
  --border-color: #373A40;
}

.chat-widget {
  width: 100%;
  max-width: 500px;
  height: 600px;
  background-color: var(--chat-bg);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  font-family: 'Inter', sans-serif;
}

.messages-area {
  flex-grow: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.messages-area::-webkit-scrollbar {
  width: 6px;
}
.messages-area::-webkit-scrollbar-track {
  background: transparent;
}
.messages-area::-webkit-scrollbar-thumb {
  background-color: var(--user-bubble-bg);
  border-radius: 20px;
}

.message-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 85%;
}

.message-wrapper.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message {
  padding: 12px 18px;
  border-radius: 20px;
  line-height: 1.5;
  color: var(--text-primary);
  word-wrap: break-word;
}

.message-wrapper.bot .message {
  background-color: var(--bot-bubble-bg);
  border-top-left-radius: 4px;
}

.message-wrapper.user .message {
  background-color: var(--user-bubble-bg);
  border-top-right-radius: 4px;
}

.bot-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(45deg, #00A9E0, #32CD32);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.input-area {
  padding: 16px 24px;
  background-color: var(--chat-bg);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 12px;
}

.input-area input {
  flex-grow: 1;
  border: none;
  background-color: var(--input-bg);
  border-radius: 24px;
  padding: 12px 20px;
  font-size: 16px;
  color: var(--text-primary);
  outline: none;
  transition: box-shadow 0.2s;
}

.input-area input:focus {
  box-shadow: 0 0 0 2px var(--accent-color);
}

.input-area input::placeholder {
  color: var(--text-secondary);
}

.input-area button {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background-color: var(--accent-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, opacity 0.2s;
}

.input-area button:hover {
  transform: scale(1.1);
}

.input-area button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: scale(1);
}

.typing-indicator span {
  height: 8px;
  width: 8px;
  background-color: var(--text-secondary);
  border-radius: 50%;
  display: inline-block;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-of-type(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-of-type(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1.0); }
}