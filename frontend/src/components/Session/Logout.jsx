import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../Api';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
        const response = await API.post('auth_blueprint/logout', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
        localStorage.removeItem('accessToken');
        navigate('/login');
        return response
        } catch (error) {
        console.error('Error logging out:', error);
        }
    };

    return (
        <Button variant="text" color="inherit" onClick={handleLogout}>
        Cerrar sesión
        </Button>
    );
};

export default LogoutButton;
