import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//librería para rutas
import { BrowserRouter } from "react-router-dom";

//librería para manejar Temas y estilos
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";

//fuentes roboto
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

//tema de la página
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#006064',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline/>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)
