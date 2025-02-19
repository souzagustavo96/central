import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// Criando e renderizando o componente principal
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolvendo o App com BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
