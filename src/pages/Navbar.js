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
import {useEffect} from "react";


export default function Navbar() {

    const [auth, setAuth] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const history = useNavigate();
    const [loggedUser, setLoggedUser] = React.useState("")


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const a = localStorage.getItem("user");

    useEffect(()=>{
        console.log("navbar useeffect")
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser!==null) {
            setLoggedUser(loggedInUser);
            setAuth(true)
        }
    },[a])



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
                                {loggedUser}
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
                            >
                            </Menu>
                            <Button size={"large"} onClick={()=>{

                                localStorage.clear()
                                history('/home')
                                window.location.reload(false);
                            }} color="inherit"><b>Logout</b></Button>
                            <Button color="inherit" onClick={()=>{history('/home')}}><b>Dashboard</b></Button>
                        </div>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}