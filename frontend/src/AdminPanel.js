import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [role, setRole] = useState('Usuário');
    const [panels, setPanels] = useState([]);
    const [selectedPanels, setSelectedPanels] = useState([]);

    useEffect(() => {
        // Busca usuários do Microsoft 365
        axios.get('http://localhost:5000/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Erro ao buscar usuários:', error));
        
        // Busca painéis do Power BI do .env
        const availablePanels = process.env.REACT_APP_POWERBI_PANELS.split(',');
        setPanels(availablePanels);
    }, []);

    const handleUserSelect = (event) => {
        const userEmail = event.target.value;
        const user = users.find(u => u.email === userEmail);
        setSelectedUser(user);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handlePanelSelection = (event) => {
        const panel = event.target.value;
        setSelectedPanels(prev =>
            prev.includes(panel) ? prev.filter(p => p !== panel) : [...prev, panel]
        );
    };

    const savePermissions = () => {
        axios.post('http://localhost:5000/set-permissions', {
            email: selectedUser.email,
            role,
            panels: selectedPanels
        })
        .then(() => alert('Permissões atualizadas com sucesso!'))
        .catch(error => console.error('Erro ao salvar permissões:', error));
    };

    return (
        <div className="admin-panel">
            <h1>Painel Administrativo</h1>
            <label>Usuário:</label>
            <select onChange={handleUserSelect}>
                <option value="">Selecione um usuário</option>
                {users.map(user => (
                    <option key={user.email} value={user.email}>{user.name} ({user.email})</option>
                ))}
            </select>
            {selectedUser && (
                <div>
                    <label>Função:</label>
                    <select value={role} onChange={handleRoleChange}>
                        <option value="Usuário">Usuário</option>
                        <option value="Administrador">Administrador</option>
                    </select>

                    <label>Painéis de acesso:</label>
                    <div className="panels-list">
                        {panels.map(panel => (
                            <label key={panel}>
                                <input 
                                    type="checkbox" 
                                    value={panel} 
                                    checked={selectedPanels.includes(panel)} 
                                    onChange={handlePanelSelection} 
                                />
                                {panel}
                            </label>
                        ))}
                    </div>
                    <button onClick={savePermissions}>Salvar Permissões</button>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
