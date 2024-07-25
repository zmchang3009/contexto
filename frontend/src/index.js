import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DummiesContextProvider } from './context/DummiesContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DummiesContextProvider>
      <App />
    </DummiesContextProvider>
  </React.StrictMode>
);

