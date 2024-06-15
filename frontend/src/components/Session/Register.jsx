import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../Api';

const Registro = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await API.post('auth_blueprint/register', {
                Email: Email,
                Password: Password,
                Nombre: Nombre
            });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            setError('Error al registrar usuario. Por favor, intenta nuevamente.');
            console.error('Error registrando usuario:', error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    border: 2,
                    borderColor: 'inherit',
                    padding: 3,
                    width: '70%',
                    '& .MuiTextField-root': {
                        marginBottom: 2,
                        width: '100%',
                    },
                    '& .MuiButton-root': {
                        marginTop: 2,
                    },
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Registro de Usuario
                </Typography>
                <TextField
                    label="Nombre"
                    type="text"
                    value={Nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />
                {error && <Typography color="error" variant="body2" mt={2}>{error}</Typography>}
                <Button type="submit" variant="contained" color="primary" fullWidth mt={2}>
                    Registrarse
                </Button>
            </Box>
        </Box>
    );
};

export default Registro;