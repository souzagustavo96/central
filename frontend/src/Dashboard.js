import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("accessToken")
    );

    useEffect(() => {
        const handleStorageChange = () => {
            if (!localStorage.getItem("accessToken")) {
                setIsAuthenticated(false);
                navigate("/login");
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
        window.dispatchEvent(new Event("storage")); // Garante que todos os componentes percebam a mudança
        navigate("/login");
    };

    if (!isAuthenticated) {
        return null; // Evita que o conteúdo do dashboard seja renderizado enquanto redireciona
    }

    return (
        <div className="dashboard-container">
            <h1>Relatórios Power BI</h1>
            <button className="logout-button" onClick={handleLogout}>Sair</button>
            <div className="report-container">
                <iframe
                    title="INDICADORES_TI_GLPI"
                    width="1140"
                    height="541.25"
                    src="https://app.powerbi.com/reportEmbed?reportId=ec3df829-037e-4b49-b853-5c540294bc05&autoAuth=true&ctid=86944b07-807b-457a-b4c7-5717ad5680a0"
                    frameBorder="0"
                    allowFullScreen={true}
                ></iframe>
            </div>
        </div>
    );
};

export default Dashboard;
