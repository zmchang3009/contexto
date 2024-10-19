import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DummiesContextProvider } from './context/DummiesContext'
import { WordsContextProvider } from './context/WordsContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DummiesContextProvider>
      <WordsContextProvider>
        <App />
      </WordsContextProvider>
    </DummiesContextProvider>
  </React.StrictMode>
);

