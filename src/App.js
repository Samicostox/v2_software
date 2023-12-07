import React from "react";
import "./App.css";
import "./index.css";
import ChatBot from "./Qodly/chatbot";

import DataModelDiagram from "./datamodeldiagram";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChatBot></ChatBot>
      </header>
    </div>
  );
}

export default App;
