import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Button, Snackbar } from '@mui/material';

export default function Biblioteca() {
    const [libros, setLibros] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchLibros = async () => {
            try {
            const response = await axios.get(`http://127.0.0.1:5000/biblioteca_blueprint/biblioteca?page=${page}&per_page=${rowsPerPage}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
            setLibros(response.data);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        fetchLibros();
    }, [page, rowsPerPage]);

    //función para el cambio de página
    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    //funcion para cambiar el estado del libro
    const handleEstadoClick = async (id) => {
        try {
            const libroToUpdate = libros.find(libro => libro.Id_Biblioteca === id);
            const newEstado = !libroToUpdate.Estado;

            await axios.put(`http://127.0.0.1:5000/biblioteca_blueprint/biblioteca/${id}`, 
                { Estado: newEstado },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                }
            );

            // Actualizar localmente el estado del libro
            const updatedLibros = libros.map(libro => {
                if (libro.Id_Biblioteca === id) {
                    return { ...libro, Estado: newEstado };
                }
                return libro;
            });
            setLibros(updatedLibros);

        } catch (error) {
            console.error('Error updating Estado:', error);
        }
    };

    const handleEliminarClick = async (id) => {
        try {

            const response = await axios.delete(`http://127.0.0.1:5000/biblioteca_blueprint/biblioteca/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });

            // Mostrar Snackbar con mensaje de éxito
            setSnackbarMessage(response.data.msg);
            setSnackbarOpen(true);

            // Recargar la página para reflejar los cambios
            window.location.reload();

        } catch (error) {
            console.error('Error eliminando libro:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
    <Container>
        <Typography variant="h4" gutterBottom>
        Biblioteca personal
        </Typography>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Editorial</TableCell>
                <TableCell>Fecha de publicacion</TableCell>
                <TableCell>ISBN</TableCell>
                <TableCell>Paginas</TableCell>
                <TableCell>Genero</TableCell>
                <TableCell>Idioma</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {libros.map((libro) => (
                <TableRow key={libro.Id_Biblioteca}>
                <TableCell>{libro.Libro.Id_Libro}</TableCell>
                <TableCell>{libro.Libro.Titulo}</TableCell>
                <TableCell>{libro.Libro.Autor}</TableCell>
                <TableCell>{libro.Libro.Editorial}</TableCell>
                <TableCell>{libro.Libro.Fecha_publicacion}</TableCell>
                <TableCell>{libro.Libro.ISBN}</TableCell>
                <TableCell>{libro.Libro.Paginas}</TableCell>
                <TableCell>{libro.Libro.Genero}</TableCell>
                <TableCell>{libro.Libro.Idioma}</TableCell>
                <TableCell>
                    <Button 
                        variant="outlined" 
                        color={libro.Estado ? 'secondary' : 'primary'} // Cambia el color según el estado
                        onClick={() => handleEstadoClick(libro.Id_Biblioteca)}
                    >
                        {libro.Estado ? 'Leído' : 'No leído'}
                    </Button>
                </TableCell>
                <TableCell>
                    <Button 
                        variant="outlined" 
                        color="error"
                        onClick={() => handleEliminarClick(libro.Id_Biblioteca)} // Llama a la función de eliminar
                    >
                        Eliminar
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Pagination
            count={Math.floor(libros.length /50 )+1}
            page={page}
            onChange={handleChangePage}
            size='large'
        />
         <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
    </Container>
    );
}