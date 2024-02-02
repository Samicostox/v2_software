import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChatBot from "./Qodly/chatbots";
import CSVTable from "./Qodly/table";
import Mixtral from "./Qodly/mixtral";
import SideBar from "./Qodly/sidebar";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/gpt" element={<ChatBot />} />
          <Route path="/mixtral" element={<Mixtral />} />
          <Route path="/csvtable" element={<CSVTable />} />
          <Route path="/" element={<SideBar />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
