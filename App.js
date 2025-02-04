import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { PublicClientApplication } from "@azure/msal-browser";
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import HelloWorld from './HelloWorld';
import './App.css';

// Componente de login com Microsoft
function AuthenticatedApp() {
    const [authConfig, setAuthConfig] = useState(null);
    const [msalInstance, setMsalInstance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authConfig) {
            fetch('http://localhost:5000/auth-config')
                .then(response => response.json())
                .then(data => {
                    setAuthConfig(data);
                    const msalConfig = {
                        auth: {
                            clientId: data.clientId,
                            authority: `https://login.microsoftonline.com/${data.tenantId}`,
                            redirectUri: data.redirectUri
                        }
                    };
                    // Apenas define o msalInstance se ele ainda não estiver configurado
                    if (!msalInstance) {
                        setMsalInstance(new PublicClientApplication(msalConfig));
                    }
                })
                .catch(error => console.error("Erro ao obter configurações de autenticação:", error));
        }
    }, [authConfig, msalInstance]); 
    

    const handleLogin = async () => {
        console.log("Tentando fazer Login");
        if (!msalInstance) return;
        try {
            const loginResponse = await msalInstance.loginPopup({ scopes: ["User.Read"] });
            console.log("Login bem-sucedido:", loginResponse);
            localStorage.setItem('accessToken', loginResponse.accessToken); // Salve o token de acesso
            navigate('/dashboard');
            console.log("Navegação para /dashboard foi chamada"); // Redireciona para o Dashboard após o login
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    if (!authConfig) {
        return <div>Carregando...</div>;
    }

    return (
        <div>
            <h1>Login com Azure AD</h1>
            <button onClick={handleLogin}>Entrar com Microsoft</button>
        </div>
    );
}

// Função principal que controla as rotas
function App() {
    const navigate = useNavigate();

    useEffect(() => {
        // Verifica se o usuário está autenticado
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            navigate('/dashboard'); // Redireciona para o Dashboard se já estiver autenticado
        } else {
            navigate('/login'); // Redireciona para a página de login caso contrário
        }
    }, [navigate]);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} /> {/* Página de Login padrão */}
                <Route path="/dashboard" element={<Dashboard />} /> {/* Página de Dashboard */}
            </Routes>
        </Router>
    );
}

export default App;
