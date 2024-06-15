import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Biblioteca from "./pages/Biblioteca";
import Libros from "./pages/Libros";

export default function App() {
  return(
    <>
      <Navbar />
        <Container  sx={{mt:3}}>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/biblioteca" element={<Biblioteca/>}></Route>
                <Route path="/libros" element={<Libros/>}></Route>
            </Routes>
        </Container>
    </>
  )
}
