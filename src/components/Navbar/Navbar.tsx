import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { UserAuth } from 'context/AuthContext';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.scss';

const Navbar = () => {
    const { logout } = UserAuth() ?? {};
    const { user } = UserAuth();
    const location = useLocation();

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');

        } catch (error) {
            throw (error);
        }
    };
    const rawerWidth = 240;

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: rawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: rawerWidth,
                    boxSizing: 'border-box',
                    height: `calc(100vh - 120px)`,
                    borderRadius: '10px',
                    marginTop: '90px',
                    marginBottom: '30px',
                    marginLeft: '30px',
                    marginRight: '30px',
                    position: 'fixed',

                },
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <div className='user-info'>
                    <span className='flex justify-center'><AccountCircleIcon /></span>
                    <h1 className='flex justify-center capitalize'>{user?.name || 'Guest'}</h1>
                </div>
                <Divider />
                <List>
                    {['dashboard', 'expenses', 'incomes', 'categories'].map((text, index) => (
                        <React.Fragment key={text}>
                            <ListItem disablePadding>
                                <ListItemButton component="div"
                                    sx={{
                                        backgroundColor: location.pathname === `/${text}` ? '#f0f0f0ba' : 'inherit',
                                    }}
                                    onClick={() => navigate(`/${text}`)}>
                                    <ListItemText primary={text.charAt(0).toUpperCase() + text.slice(1)} />
                                </ListItemButton>
                            </ListItem>
                            {index < 3 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Box>
            <div className='flex justify-center logout-button'>
                <Button variant="contained" onClick={handleLogout}>LOGOUT</Button>
            </div>
        </Drawer>
    )
}

export default Navbar
