import React from 'react';
import ImageGenerator from './components/ImageGenerator';
import './index.css';

function App() {
  return (
    <div className="app-layout">
      <header className="page-header">
        <h1>Image Generator</h1>
        <p>A tool to generate your images</p>
      </header>
      <ImageGenerator />
    </div>
  );
}

export default App;
