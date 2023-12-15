import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChatBot from "./Qodly/chatbot";
import CSVTable from "./Qodly/table";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* Navigation could be added here if needed */}
        </header>
        <Routes>
          <Route path="/" element={<ChatBot />} />
          <Route path="/csvtable" element={<CSVTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
