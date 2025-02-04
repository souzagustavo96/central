import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import LoginPage from './LoginPage';

// Criando e renderizando o componente principal
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolva o LoginPage com BrowserRouter */}
      <LoginPage />
    </BrowserRouter>
  </React.StrictMode>
);