import React from 'react';
import './home.css';


function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo à Home</h1>
      <p>Esta é a tela principal do aplicativo.</p>
      <button onClick={() => alert('Botão clicado!')}>Clique aqui</button>
    </div>
  );
}

export default home;
