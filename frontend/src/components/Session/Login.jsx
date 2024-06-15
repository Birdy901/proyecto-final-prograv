import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import API from '../../Api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await API.post('auth_blueprint/login', { Email: Email, Password: Password });
        console.log(response.data);
        localStorage.setItem('accessToken', response.data.access_token);
        navigate('/');
        } catch (error) {
        console.error('Error logging in:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
        <TextField
            label="Email"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
        />
        <TextField
            label="Password"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
        </Button>
        </Box>
    );
};

export default Login;
