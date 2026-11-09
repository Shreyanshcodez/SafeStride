import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { SafetyProvider } from './context/SafetyContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <SafetyProvider>
        <App />
      </SafetyProvider>
    </HashRouter>
  </React.StrictMode>,
);

