import { useState, useEffect } from 'react';

function useAuthConfig() {
    const [authConfig, setAuthConfig] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/auth-config')
            .then((response) => response.json())
            .then((data) => setAuthConfig(data))
            .catch((error) => console.error('Erro ao obter configurações de autenticação:', error));
    }, []);

    return authConfig;
}

export default useAuthConfig;
