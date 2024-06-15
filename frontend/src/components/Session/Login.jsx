import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Link, autocompleteClasses, Container } from '@mui/material';
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
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            }}
            >
            <Box component="form" onSubmit={handleSubmit} sx={{
                border: 2,
                borderColor: 'inherit',
                padding: 3,
                margin: 'auto',
                width: '70%',
                }}
            >
            <Typography variant='h5' align='center' color='primary'>Inicio de sesión</Typography>
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
            <Typography variant="body2" align="center" mt={2}>
                ¿No tienes una cuenta?{' '}
                <Link component="button" onClick={() => navigate('/registro')} color="primary">
                    Regístrate aquí
                </Link>
            </Typography>
            </Box>
        </Container>
    );
};

export default Login;
