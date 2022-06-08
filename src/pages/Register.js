import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

const theme = createTheme();


const Register = () =>{

    //TODO: alert  https://stackoverflow.com/questions/66778316/how-to-display-material-ui-alert-based-on-the-response-of-axios-post-reactjs
    // response
    const history = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(process.env.REACT_APP_LOCAL_HOST + "/users/register");
        axios.post(process.env.REACT_APP_LOCAL_HOST + "/users/register", {
            email: data.get('email'),
            password: data.get('password'),
        }).then((response)=>{console.log(response)})

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
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
                        Register
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={()=>{history("/login")}}
                        >
                            Register
                        </Button>



                        <Grid container>
                            <Grid item xs>
                                <div/>
                            </Grid>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Already have an account? Log in"}
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

export default Register;