import React, { useState, useEffect } from "react";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleSend = async () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput !== "") {
      setMessages([...messages, { text: trimmedInput, sender: "user" }]);
      setUserInput("");
      setIsLoading(true); // Start loading

      try {
        const response = await axios.post(
          "https://djangoback-705982cd1fda.herokuapp.com/api/chatbot/",
          { user_input: trimmedInput }
        );
        const botResponse = response.data.response;
        setMessages((messages) => [
          ...messages,
          { text: botResponse, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error fetching response from chatbot:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    }
  };
  const renderMessage = (msg, index) => {
    const isUser = msg.sender === "user";
    const messageLength = msg.text.length;

    // Function to determine the width class based on message length
    const getWidthClass = (length) => {
      if (length < 50) return "w-1/4"; // For short messages
      if (length < 100) return "w-1/2"; // For medium messages
      return "w-3/4"; // For longer messages
    };

    const widthClass = getWidthClass(messageLength);

    return (
      <div
        key={index}
        className={`flex items-center space-x-2 my-2 ${
          isUser ? "justify-end" : ""
        }`}
      >
        {!isUser && (
          <div className="flex items-center justify-center h-8 w-8 bg-gray-700 text-white text-lg rounded-full">
            🤖
          </div>
        )}
        <div
          className={`break-words p-3 rounded-lg text-sm ${widthClass} ${
            isUser ? "bg-blue-500 text-left" : "bg-gray-700 text-left"
          }`}
        >
          {isUser ? (
            detectAndRenderCodeSnippet(msg.text)
          ) : (
            <pre className="whitespace-pre-wrap text-white font-mono">
              <code>{msg.text}</code>
            </pre>
          )}
        </div>
        {isUser && (
          <div className="flex items-center justify-center h-8 w-8 bg-blue-500 text-white text-lg rounded-full">
            👤
          </div>
        )}
      </div>
    );
  };

  const detectAndRenderCodeSnippet = (text) => {
    // Split the text by lines
    const lines = text.split("\n");

    // Filter out lines that are within code blocks (between ```)
    let inCodeBlock = false;
    const processedLines = lines.map((line) => {
      if (line.startsWith("```") && !inCodeBlock) {
        inCodeBlock = true;
        return ""; // Remove starting backticks
      } else if (line.startsWith("```") && inCodeBlock) {
        inCodeBlock = false;
        return ""; // Remove ending backticks
      }
      return inCodeBlock ? (
        line
      ) : (
        <span className="text-white">
          {line}
          <br />
        </span>
      );
    });

    // Join the processed lines back together
    const processedText = processedLines.map((line, index) => {
      if (typeof line === "string") {
        // If it's a string, it's a part of code block
        return (
          <span key={index}>
            {line}
            <br />
          </span>
        );
      }
      return line;
    });

    return <div>{processedText}</div>;
  };

  return (
    <div>
      <div className=" max-w-[1500px] overflow-y-auto p-4 space-y-2 pl-20 pr-20">
        {messages.map(renderMessage)}
      </div>
    </div>
  );
}
export default Messages;
