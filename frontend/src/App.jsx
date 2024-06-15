import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";

//rutas de sesiones
import Login from "./components/Session/Login";

//rutas protegidas
import ProtectedRoute from "./components/ProtectedRoute";

//pages
import Home from "./pages/Home";
import Biblioteca from "./pages/Biblioteca";
import Libros from "./pages/Libros";

export default function App() {
  const location = useLocation();
  
  // Rutas que no deberían mostrar la Navbar
  const noNavBarRoutes = ['/login'];

  return(
    <>
      {!noNavBarRoutes.includes(location.pathname) && <Navbar />}
        <Container  sx={{mt:3}}>
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
                <Route path="/biblioteca" element={<ProtectedRoute><Biblioteca/></ProtectedRoute>}></Route>
                <Route path="/libros" element={<ProtectedRoute><Libros/></ProtectedRoute>}></Route>
            </Routes>
        </Container>
    </>
  )
}
