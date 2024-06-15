import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';

export default function Libros() {
    const [libros, setLibros] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(50);

    useEffect(() => {
        const fetchLibros = async () => {
            try {
            const response = await axios.get('http://127.0.0.1:5000/libro_blueprint/libros?page=${page}&per_page=${rowsPerPage}');
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

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Pagination
            count={Math.floor(libros.length /50 )+1}
            onChange={handleChangePage}
            size='large'
        />
    </Container>
    );
}