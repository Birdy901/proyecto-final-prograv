import { AppBar, Box, Button, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import LogoutButton from "../Session/Logout";

import {useState} from "react";

//iconos
import MenuIcon from "@mui/icons-material/Menu"
import HomeIcon from '@mui/icons-material/Home';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

import {NavLink} from 'react-router-dom'

//Arreglo de elementos y sus rutas para el navbar
const NavLinksArray = [
    {
        title: "Home", path: "/", icon: <HomeIcon/>
    },
    {
        title: "Biblioteca", path: "/biblioteca", icon: <LocalLibraryIcon/>
    },
    {
        title: "Libros", path: "/libros", icon: <CollectionsBookmarkIcon/>
    },
]

export default function Navbar() {

    const [open, setOpen] = useState(false)

    return(
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => setOpen(true)}
                        sx={{display: {xs:"flex", sm:"none"}}}
                        >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" sx={{flexGrow: 1}}>Biblioteca Mistica Thalindor</Typography>
                    <Box sx={{display: {xs:"none", sm:"block"}}}>
                        {
                            NavLinksArray.map(item => (
                            <Button 
                                color="inherit" 
                                key={item.title}
                                component={NavLink}
                                to={item.path}
                            >
                                {item.title}
                            </Button>
                            ))
                        }
                        <LogoutButton/>
                    </Box>
                    

                </Toolbar>
            </AppBar>
            
            <Drawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                >
                <NavListDrawer NavLinksArray={NavLinksArray} NavLink={NavLink} setOpen={setOpen}/>
            </Drawer>
                
        </>
    )
}