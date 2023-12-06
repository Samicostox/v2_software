import React from 'react';
import './App.css';
import './index.css';


import DataModelDiagram from './datamodeldiagram';
import ChatBot from './Qodly';

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
