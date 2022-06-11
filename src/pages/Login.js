import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const theme = createTheme();
let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//TODO: add check to see password when logging in
//TODO: delete remember me and make it a check for showing/hiding password
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function SignIn() {

    const history = useNavigate();

    const [dialogueMessage,setDialogueMessage] = useState('')
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const [iopen, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('email').split("@")[0];
        if( re.test(data.get('email')) === false){
            handleClickOpen()
            setDialogueMessage("Entered email is not valid !")
        }else {
            if (checked === false) {
                axios.post(process.env.REACT_APP_LOCAL_HOST + "/users/login", {
                    email: data.get('email'),
                    password: data.get('password')
                }).then((resp) => {
                        if (resp.data.success === false) {
                            handleClickOpen()
                            setDialogueMessage(resp.data.message)
                        } else {
                            history("/users/" + username, {
                                state: {
                                    token: resp.data.token,
                                    email: data.get('email'),
                                    user_id: resp.data.item.id
                                }
                            })
                        }
                    }
                )
            } else {
                axios.post(process.env.REACT_APP_LOCAL_HOST + "/admin/login", {
                    email: data.get('email'),
                    password: data.get('password')
                }).then((resp) => {
                    if (resp.data.success === false) {
                        handleClickOpen()
                        setDialogueMessage(resp.data.message)
                    } else {
                        history("/admin/" + username, {
                            state: {
                                token: resp.data.token,
                                email: data.get('email'),
                                user_id: resp.data.item.id
                            }
                        })
                    }
                })

            }
        }
    };




    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <Dialog
                    open={iopen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle >{"There is a problem with your login !"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {dialogueMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleClose}>Agree</Button>
                    </DialogActions>
                </Dialog>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        Are you an admin ?
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <div/>
                            </Grid>
                            <Grid item>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/*<Copyright sx={{ mt: 8, mb: 4 }} />*/}
            </Container>
        </ThemeProvider>
    );
}