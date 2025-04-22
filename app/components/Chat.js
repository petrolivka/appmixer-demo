"use client";

import { useState, useRef, useEffect } from "react";

const WEBHOOK_URL =
  "https://api.pumped-jackass-32081.appmixer.cloud/flows/a41c8f2a-9c24-4d4a-96ee-acd6a1347823/components/8488bf35-9d88-492e-8c0a-b8914c0bfa6c";

const fetcher = async (url, message) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch response from AI agent");
  }

  return response.json();
};

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage = { sender: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);

    // Clear input and set loading
    const userInput = input;
    setInput("");
    setLoading(true);

    try {
      // Send request to webhook
      const response = await fetcher(WEBHOOK_URL, userInput);

      // Add AI response to chat
      let responseText = "Sorry, I couldn't process that request.";

      // Try to extract the response from different possible formats
      if (typeof response === "object") {
        if (response.content) {
          responseText = response.content;
        } else {
          // If no recognized properties, stringify the whole response
          responseText = JSON.stringify(response);
        }
      } else if (typeof response === "string") {
        responseText = response;
      }

      const aiMessage = {
        sender: "ai",
        text: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error communicating with AI agent:", error);
      // Add error message to chat
      const errorMessage = {
        sender: "system",
        text: "Error: Failed to get response from AI agent.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-600 text-white">
        <h2 className="text-xl font-semibold">Movie Recommendation Chatbot</h2>
      </div>

      <div className="flex-1 p-4 h-96 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 p-4">
            <p>Ask me what you want to watch!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs md:max-w-md p-3 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white rounded-br-none"
                      : msg.sender === "system"
                      ? "bg-red-100 text-red-800 rounded-bl-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex items-center">
          <textarea
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="2"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending
              </span>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
