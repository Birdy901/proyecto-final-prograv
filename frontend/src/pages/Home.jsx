import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
    return(
    <Container>
        <Box textAlign="center" mt={5}>
            <Typography variant="h3" gutterBottom>
                ¡Bienvenido a la biblioteca Mística de Thalindor!
            </Typography>
            <Typography variant="h5" gutterBottom>
                Guarda aquí tu biblioteca personal con nuestra variedad de libros disponibles
            </Typography>
            <Box mt={4}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to="/biblioteca"
                    sx={{ marginRight: 2 }}
                >
                    Biblioteca Personal
                </Button>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    component={Link} 
                    to="/libros"
                >
                    Ver libros
                </Button>
            </Box>
        </Box>
    </Container>
    )
}