import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Button, Snackbar } from '@mui/material';

export default function Libros() {
    const [libros, setLibros] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(50);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchLibros = async () => {
            try {
            const response = await axios.get(`http://127.0.0.1:5000/libro_blueprint/libros?page=${page}&per_page=${rowsPerPage}`);
            setLibros(response.data);
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        fetchLibros();
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
    };

    const handleAgregarBiblioteca = async (idLibro) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/biblioteca_blueprint/biblioteca', 
                { Id_Libro: idLibro, Estado: false },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
            console.log(response.data);

            setSnackbarMessage(response.data.msg);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error añadiendo libro:', error);
            setSnackbarMessage('Este libro ya ha sido agregado');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
    <Container>
        <Typography variant="h4" gutterBottom>
        Lista de Libros
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
                <TableCell>Agregar a Biblioteca</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {libros.map((libro) => (
                <TableRow key={libro.Id_Libro}>
                <TableCell>{libro.Id_Libro}</TableCell>
                <TableCell>{libro.Titulo}</TableCell>
                <TableCell>{libro.Autor}</TableCell>
                <TableCell>{libro.Editorial}</TableCell>
                <TableCell>{libro.Fecha_publicacion}</TableCell>
                <TableCell>{libro.ISBN}</TableCell>
                <TableCell>{libro.Paginas}</TableCell>
                <TableCell>{libro.Genero}</TableCell>
                <TableCell>{libro.Idioma}</TableCell>
                <TableCell>
                    <Button 
                        variant="outlined" 
                        color="primary"
                        onClick={() => handleAgregarBiblioteca(libro.Id_Libro)}
                    >
                        Agregar a biblioteca
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