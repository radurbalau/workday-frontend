import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useNavigate } from 'react-router-dom';


export default function ButtonAppBar() {

    //TODO: Use redux to listen to state
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={()=>{history('/home');
                        }}
                    >
                        <AirplaneTicketIcon fontSize={"large"} />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        FIND A GOOD NAME
                    </Typography>
                    {auth===false ?  (<div>
                        <Button size={"large"} onClick={()=>{history('/login')}} color="inherit"><b>Login</b></Button>
                        <Button color="inherit" onClick={()=>{history('/register')}}><b>Register</b></Button>
                    </div>
                    ): (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                            </Menu>
                            <Button size={"large"} onClick={()=>{history('/login')}} color="inherit"><b>Logout</b></Button>
                            <Button color="inherit" onClick={()=>{history('/register')}}><b>Dashboard</b></Button>
                        </div>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}