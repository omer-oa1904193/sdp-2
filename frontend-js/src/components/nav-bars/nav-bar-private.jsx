import React from 'react';
import { AppBar, Box, IconButton, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBarPrivate() {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                        Massar
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <MenuItem sx={{ mr: 1 }}>Home</MenuItem>
                        <MenuItem>About</MenuItem>
                    </Box>
                </Toolbar>
            </AppBar>

        </>
    );
}
