import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Trash2, Send, Sparkles } from 'lucide-react';
import { aiEngine } from '../../services/aiAssistantEngine';
import './AiAssistant.css';

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: `Hello! 👋 I'm Rehman Shariff's Portfolio AI Assistant.\n\nHow can I help you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        'Tell me about yourself',
        'Education & VTU CGPA',
        '3 Internship experiences',
        'Deepfake Detection AI',
        'All 6 GitHub Projects',
        'Certifications',
        'Why hire Rehman?',
        'Contact & WhatsApp'
      ]
    }
  ]);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user', text: query, time: userTime };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const response = aiEngine.processQuery(query);
      const assistantTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: response.text,
          time: assistantTime,
          suggestions: response.suggestions
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  const handleClear = () => {
    setMessages([
      {
        sender: 'assistant',
        text: `Chat cleared. Ask me anything about Rehman Shariff's portfolio!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          'Tell me about yourself',
          'Education & VTU CGPA',
          '3 Internship experiences',
          'Deepfake Detection AI',
          'All 6 GitHub Projects',
          'Contact & WhatsApp'
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          className="ai-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open Portfolio AI Assistant"
        >
          <div className="ai-trigger__badge">
            <Sparkles size={16} />
          </div>
          <span>Ask AI Assistant</span>
        </button>
      )}

      {/* Side Panel Drawer */}
      <aside className={`ai-drawer ${isOpen ? 'ai-drawer--open' : ''}`}>
        {/* Header */}
        <header className="ai-drawer__header">
          <div className="ai-drawer__header-left">
            <div className="ai-drawer__avatar">
              <Bot size={20} />
            </div>
            <div>
              <div className="ai-drawer__title">Portfolio AI Guide</div>
              <div className="ai-drawer__status">
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-success)' }} />
                <span>Online Knowledge Base</span>
              </div>
            </div>
          </div>

          <div className="ai-drawer__header-actions">
            <button
              className="ai-drawer__icon-btn"
              onClick={handleClear}
              title="Clear Conversation"
            >
              <Trash2 size={16} />
            </button>
            <button
              className="ai-drawer__icon-btn"
              onClick={() => setIsOpen(false)}
              title="Close Assistant"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="ai-drawer__body">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`ai-msg ${msg.sender === 'user' ? 'ai-msg--user' : 'ai-msg--assistant'}`}
            >
              <div className="ai-msg__bubble">
                <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
              </div>
              <span className="ai-msg__time">{msg.time}</span>

              {/* Suggestion Chips */}
              {msg.suggestions && msg.suggestions.length > 0 && index === messages.length - 1 && (
                <div className="ai-suggestions">
                  {msg.suggestions.map((chip, cIdx) => (
                    <button
                      key={cIdx}
                      className="ai-chip"
                      onClick={() => handleSend(chip)}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Typing Animation Indicator */}
          {isTyping && (
            <div className="ai-typing">
              <div className="ai-typing__dot" />
              <div className="ai-typing__dot" />
              <div className="ai-typing__dot" />
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Footer */}
        <footer className="ai-drawer__footer">
          <form
            className="ai-drawer__input-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="ai-drawer__input"
              placeholder="Ask about projects, skills, resume..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
            />
            <button type="submit" className="ai-drawer__send-btn" aria-label="Send Message">
              <Send size={16} />
            </button>
          </form>
        </footer>
      </aside>
    </>
  );
};

export default AiAssistant;
