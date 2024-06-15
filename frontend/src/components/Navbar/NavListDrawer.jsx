import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LogoutButton from "../Session/Logout";

export default function NavListDrawer({NavLinksArray, NavLink, setOpen}) {
    return(
        <Box sx={{width: 250, bgcolor: "inherit"}}>
            <nav>
                <List>
                    {
                        NavLinksArray.map(item => (
                            <ListItem 
                                disablePadding
                                key={item.title}
                            >
                                <ListItemButton 
                                component={NavLink} 
                                to={item.path}
                                onClick={() => setOpen(false)}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText>{item.title}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                    <ListItem disablePadding>
                        <LogoutButton />
                    </ListItem>
                </List>
            </nav>
        </Box>
    )
}