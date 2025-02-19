import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import AdminPanel from "./AdminPanel";
import Home from "./home";
import "./App.css";

function App() {
    const [authConfig, setAuthConfig] = useState(null);
    const [msalInstance, setMsalInstance] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuthConfig();

        const handleStorageChange = () => {
            setIsAuthenticated(!!localStorage.getItem("accessToken"));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const fetchAuthConfig = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth-config");
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

            const data = await response.json();
            setAuthConfig(data);

            const msalConfig = {
                auth: {
                    clientId: data.clientId,
                    authority: `https://login.microsoftonline.com/${data.tenantId}`,
                    redirectUri: data.redirectUri,
                },
            };
            setMsalInstance(new PublicClientApplication(msalConfig));
        } catch (error) {
            console.error("Erro ao obter configurações de autenticação:", error);
        }
    };

    const handleLogin = async () => {
        if (!msalInstance) {
            console.error("MSAL não inicializado");
            return;
        }

        try {
            const loginResponse = await msalInstance.loginPopup({ scopes: ["User.Read"] });
            localStorage.setItem("accessToken", loginResponse.accessToken);
            window.dispatchEvent(new Event("storage")); // Notifica outras abas
            setIsAuthenticated(true);
            navigate("/home"); // Redireciona corretamente
        } catch (error) {
            console.error("Erro ao fazer login:", error);
        }
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage onLogin={handleLogin} />} />
            <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/admin-panel" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
