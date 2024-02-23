import React, { useState, useEffect } from "react";
import axios from "axios";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import LottieAnimation from "./lottie";
import { CodeBlock, dracula } from "react-code-blocks";

function GPTFT({ model, big_logo, small_logo }) {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const customScrollStyle = {
    overflowY: "auto",
    scrollbarWidth: "none" /* For Firefox */,
    msOverflowStyle: "none" /* For Internet Explorer and Edge */,
  };
  // Hide scrollbar for Chrome, Safari and Opera
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `.no-scrollbar::-webkit-scrollbar { display: none; }`,
    styleSheet.cssRules.length
  );

  const handleSend = async () => {
    const trimmedInput = userInput.trim();
    if (trimmedInput !== "") {
      const messagesString = messages
        .map((message) => `"${message.sender}": "${message.text}"`)
        .join(", ");

      setMessages([...messages, { text: trimmedInput, sender: "user" }]);
      setUserInput("");
      setIsLoading(true);
      setIsBotTyping(true); // Bot starts typing

      try {
        const response = await axios.post(
          "https://lrback-8e9079a9768d.herokuapp.com/api/chatbots/",
          {
            user_input: trimmedInput,
            conversation: messagesString,
            model: model,
          }
        );
        const botResponse = response.data.response;
        setMessages((messages) => [
          ...messages,
          { text: botResponse, sender: "bot" },
        ]);
      } catch (error) {
        console.error("Error fetching response from chatbot:", error);
      } finally {
        setIsLoading(false);
        setIsBotTyping(false); // Bot stops typing
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
          <div className="flex items-center justify-center h-8 w-8 bg-white text-white text-lg rounded-full">
            <img
              src={small_logo}
              alt="Descriptive Text"
              style={{
                maxWidth: "50px", // Adjust width as needed
                maxHeight: "50px", // Adjust height as needed
                width: "auto", // Maintain aspect ratio
                height: "auto", // Maintain aspect ratio
              }}
            />
          </div>
        )}
        <div
          className={`break-words p-3 rounded-lg text-sm ${widthClass} ${
            isUser ? "bg-blue-500 text-left" : "bg-gray-700 text-left"
          }`}
        >
          {!isUser ? (
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

  const renderTypingIndicator = () => {
    return (
      <div className="flex justify-begining space-x-2 my-2">
        <div className="flex items-center justify-center h-8 w-8 bg-white text-white text-lg rounded-full">
          <img
            src={small_logo}
            alt="Descriptive Text"
            style={{
              maxWidth: "50px", // Adjust width as needed
              maxHeight: "50px", // Adjust height as needed
              width: "auto", // Maintain aspect ratio
              height: "auto", // Maintain aspect ratio
            }}
          />
        </div>
        <div
          className="flex items-center space-x-1 bg-gray-700 text-white p-3 rounded-lg "
          style={{ width: "100px", height: "100px" }}
        >
          <LottieAnimation
            cloudinaryUrl={
              "https://res.cloudinary.com/dl2adjye7/raw/upload/v1701906711/Animation_-_1701906645911_hg2luz.json"
            }
          />
        </div>
      </div>
    );
  };

  const detectAndRenderCodeSnippet = (text) => {
    let inCodeBlock = false;
    let codeContent = "";

    // Split the text by lines and process each line
    const lines = text.split("\n");
    const processedLines = lines
      .map((line, index) => {
        if (line.startsWith("```") && !inCodeBlock) {
          inCodeBlock = true; // Enter code block mode
          return null; // Don't return any content for the starting backticks
        } else if (line.startsWith("```") && inCodeBlock) {
          inCodeBlock = false; // Exit code block mode

          // Here, render the code content collected so far in a CodeBlock component
          const codeBlockToRender = (
            <CodeBlock
              key={`codeblock-${index}`}
              text={codeContent}
              language="javascript"
              theme={dracula}
            />
          );

          // Reset codeContent for the next potential code block
          codeContent = "";
          return codeBlockToRender;
        }

        if (inCodeBlock) {
          // If in a code block, accumulate lines of code
          codeContent += `${line}\n`;
          return null; // Don't return any content while accumulating code block lines
        } else {
          // For lines outside of code blocks, return them as normal text
          return (
            <span key={index} className="text-white">
              {line}
              <br />
            </span>
          );
        }
      })
      .filter((component) => component !== null); // Filter out nulls (lines inside code blocks before rendering)

    // In case the text ends with a code block without exiting backticks
    if (inCodeBlock) {
      processedLines.push(
        <CodeBlock
          key="final-codeblock"
          text={codeContent}
          language="javascript"
          theme={dracula}
        />
      );
    }

    return <div>{processedLines}</div>;
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        position: "relative", // Equivalent to bg-sky-50 in Tailwind CSS
      }}
    >
      <div
        style={{
          position: "absolute", // This makes the div position itself absolutely
          top: "50%", // Position at the middle of the screen vertically
          left: "50%", // Position at the middle of the screen horizontally
          transform: "translate(-50%, -50%)", // This ensures the div is centered properly
          zIndex: -10, // Ensure the image is above other elements
        }}
      >
        <img
          src={big_logo}
          alt="Descriptive Text"
          style={{
            maxWidth: "150px", // Adjust width as needed
            maxHeight: "150px", // Adjust height as needed
            width: "auto", // Maintain aspect ratio
            height: "auto", // Maintain aspect ratio
          }}
        />
        {["Mixtral-FT", "Llama2", "Llama2-FT"].includes(model) && (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 mt-4 text-lg">
            In Development
          </span>
        )}
      </div>
      <div
        className="max-w-[1500px] no-scrollbar p-4 space-y-2"
        style={{ width: "70%", ...customScrollStyle }}
      >
        <div>
          {messages.map(renderMessage)}
          {isBotTyping && renderTypingIndicator()}
        </div>
      </div>
      <div className="pb-5 max-w-[1500px]" style={{ width: "70%" }}>
        <div className="flex items-center px-3 py-2 rounded-lg border border-black bg-sky-50 focus-within:border-blue-500 focus-within:ring-blue-500 bg-white">
          <textarea
            id="chat"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            rows="1"
            className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg focus:outline-none dark:text-white"
            placeholder="Your message..."
          ></textarea>
          <button
            onClick={handleSend}
            className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              className="w-5 h-5 rotate-90 rtl:-rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
            <span className="sr-only">Send message</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default GPTFT;
