// src/pages/AIChatbot.jsx

import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import "../styles/chatbot.css";
import { sendChatMessage } from "../services/chatService";

const AIChatbot = () => {

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content:
        "## 👋 Welcome\nI'm your **AI Market Intelligence Assistant**.\n\nAsk me about:\n\n• Product comparisons\n• Market trends\n• Brand sentiment\n• Competitor insights"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {

    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };

    setMessages(prev => [...prev, userMessage]);

    setLoading(true);
    setInput("");

    try {

      const result = await sendChatMessage(input);

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: result.reply
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {

      const errorMessage = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content: "⚠️ Sorry, I'm having trouble connecting right now."
      };

      setMessages(prev => [...prev, errorMessage]);

    }

    setLoading(false);

  };

  const handleKeyPress = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      sendMessage();

    }

  };

  return (
    <div className="chatbot-panel">

      {/* Header */}

      <div className="chatbot-header">

        <div className="chatbot-title-group">

          <div className="ai-avatar">🤖</div>

          <div>
            <h3>AI Market Intelligence</h3>

            <span className="status-indicator">
              <span className="status-dot"></span>
              Online
            </span>

          </div>

        </div>

      </div>


      {/* Messages */}

      <div className="chatbot-messages">

        {messages.map((message) => (

          <div
            key={message.id}
            className={`message ${
              message.role === "user" ? "user-message" : "ai-message"
            }`}
          >

            <div className="message-avatar">

              {message.role === "user" ? "👤" : "🤖"}

            </div>

            <div className="message-content">

              <ReactMarkdown>{message.content}</ReactMarkdown>

            </div>

          </div>

        ))}

        {loading && (

          <div className="message ai-message typing-indicator">

            <div className="message-avatar">🤖</div>

            <div className="message-content">

              <div className="typing-dots">

                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

          </div>

        )}

        <div ref={messagesEndRef} />

      </div>


      {/* Input */}

      <div className="chatbot-input-area">

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about brand sentiment, trends, alerts, or competitors..."
          rows="1"
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >

          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">

            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>

          </svg>

        </button>

      </div>

    </div>
  );
};

export default AIChatbot;
