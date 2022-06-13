import * as React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import background from "../images/mergi.jpg";
import Box from "@mui/material/Box";
import {CardActions, CardContent, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//TODO: add footer info
const Homepage = () =>{
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div   style={{height: '93vh',width:"197.5vh",backgroundImage:`url(${background})`}} >

        <Box  sx={{
            display: 'flex',
            justifyContent: 'center',
        }} >
            <Box mt={2}  sx={{ backgroundColor:"#e0e0e0",maxWidth:600,marginLeft:"20px"}} p={1}>
                <CardContent>
                    <Box sx={{backgroundColor:"white",border: 1,  borderColor: '#9e9e9e',borderRadius: 1,padding:"5px"
                    }} >
                    <Typography variant="h5" component="div">
                       <b> Take Vacation days</b>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        made simple
                    </Typography>
                    <Divider/>

                    <Typography variant="body2">
                        This is a <b>self service</b> platform that helps users and admins to solutionise more efficiently the <b>taking days off process</b>.
                    </Typography>
                    <ul>
                        <li>
                            <Typography variant="body2">
                                <u>Users</u> have the option to <b>request days off</b>, theese will be set as "pending"
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body2">
                                <u>Admins</u> can to <b>review days off</b> and accept or deny them.
                            </Typography>
                        </li>
                    </ul>

                    </Box>
                </CardContent>
            </Box>
        </Box>
            {/*<Grid container spacing={4}>*/}
            {/*    <Grid item xs={8}>*/}
            {/*        <Item>How it Works ?</Item>*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={4}>*/}
            {/*        <Item>xs=4</Item>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </div>
    )
}

export  default  Homepage