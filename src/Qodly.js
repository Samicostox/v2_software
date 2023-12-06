import React, { useState, useEffect } from 'react';
import axios from 'axios';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; 

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  useEffect(() => {
    hljs.highlightAll(); // Apply syntax highlighting to all code elements
  }, [messages]);

  const handleSend = async () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput !== '') {
      setMessages([...messages, { text: trimmedInput, sender: 'user' }]);
      setUserInput('');
      setIsLoading(true); // Start loading

      try {
        const response = await axios.post('https://djangoback-705982cd1fda.herokuapp.com/api/chatbot/', { user_input: trimmedInput });
        const botResponse = response.data.response;
        setMessages(messages => [...messages, { text: botResponse, sender: 'bot' }]);
      } catch (error) {
        console.error('Error fetching response from chatbot:', error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };
  const TypingIndicator = () => {
    return (
      <div className="flex justify-center items-center space-x-1">
        <div className="dot bg-blue-500 h-2 w-2 rounded-full animate-bounce"></div>
        <div className="dot bg-blue-500 h-2 w-2 rounded-full animate-bounce200"></div>
        <div className="dot bg-blue-500 h-2 w-2 rounded-full animate-bounce400"></div>
      </div>
    );
  };

  const detectAndRenderCodeSnippet = (text) => {
    // Split the text by lines
    const lines = text.split('\n');
  
    // Filter out lines that are within code blocks (between ```)
    let inCodeBlock = false;
    const processedLines = lines.map(line => {
      if (line.startsWith('```') && !inCodeBlock) {
        inCodeBlock = true;
        return ''; // Remove starting backticks
      } else if (line.startsWith('```') && inCodeBlock) {
        inCodeBlock = false;
        return ''; // Remove ending backticks
      }
      return inCodeBlock ? line : <span className="text-white">{line}<br/></span>;
    });
  
    // Join the processed lines back together
    const processedText = processedLines.map((line, index) => {
      if (typeof line === 'string') {
        // If it's a string, it's a part of code block
        return <span key={index}>{line}<br/></span>;
      }
      return line;
    });
  
    return <div>{processedText}</div>;
  };
  

  const renderMessage = (msg, index) => {
    const isUser = msg.sender === 'user';
    return (
      <div key={index} className={`flex items-center space-x-2 my-2 ${isUser ? 'justify-end' : ''}`}>
        {!isUser && (
          <div className="flex items-center justify-center h-8 w-8 bg-gray-700 text-white text-lg rounded-full">🤖</div>
        )}
        <div className={`break-words p-3 rounded-lg text-sm w-full ${isUser ? 'bg-blue-500 text-left' : 'bg-gray-700 text-left'}`}>
          {isUser ? detectAndRenderCodeSnippet(msg.text) : (<pre className="whitespace-pre-wrap text-white font-mono"><code>{msg.text}</code></pre>)}
        </div>
        {isUser && (
          <div className="flex items-center justify-center h-8 w-8 bg-blue-500 text-white text-lg rounded-full">👤</div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-14xl mx-auto my-10 p-12 bg-white shadow-lg rounded-lg">
      <div className="h-192 overflow-y-auto p-4 space-y-2">
        {messages.map(renderMessage)}
      </div>
      <div className="mt-4 flex justify-center items-center max-w-7xl mx-auto">
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          className="flex-1 p-2 border-2 border-gray-200 rounded-md text-black text-sm resize-none w-full md:w-3/4 lg:w-1/2"
          placeholder="Type a message..."
          rows="3"
        ></textarea>
        <button
          onClick={handleSend}
          className="ml-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 "
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
