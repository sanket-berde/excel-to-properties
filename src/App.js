import React from 'react';
import './App.css';
import ExcelToProperties from './components/ExcelToProperties';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{ marginBottom: '10px' }}>Upload an excel file with appropriate format</h2>
        <ExcelToProperties />
      </header>
    </div>
  );
}

export default App;
