import {Card, CardActionArea, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function AdminHomePageOnePtoUncheckedCard(props) {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleApprove = () => {
        console.log({
            user_pto_dates_id: props.pto.user_pto_dates_id,
            review: checked===true ? "TRUE" : "FALSE"
        })
        console.log(props.pto.user_id)
        console.log("handle Approve")
        console.log({
                user_pto_dates_id: props.pto.user_pto_dates_id,
                review: checked===true ? "TRUE" : "FALSE"
            })
        axios.post(process.env.REACT_APP_LOCAL_HOST + "/admin/review/user/" + props.pto.user_id, {
            user_pto_dates_id: props.pto.user_pto_dates_id,
            review: checked===true ? "TRUE" : "FALSE"
        },{
            headers: {
                'Authorization': `${props.token}`
            }
        }).then((resp) => {
            console.log(resp.data)
            handleClose()
        })
    }

    return (<div>
        <button onClick={()=>{console.log(props.pto.user_id)}}>dsada</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                Do you really want to approve this PTO ?
                <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleApprove}>Save </Button>
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>

        <Card style={{backgroundColor:"#ffa183"}} onClick={handleClickOpen} sx={{ maxWidth: 600 }}>
        <CardActionArea>
            <CardContent>
                <Box p={1}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.pto.email.split("@")[0]}
                </Typography>
                <Grid container display={"flex"} spacing={1}>
                    <Grid item xs={6}>
                        <Typography gutterBottom variant="body3" component="div">
                            {props.pto.pto_date_taken.split("T")[0]}
                        </Typography>
                    </Grid>
                    <Grid item  xs={6}>
                        <Box display="flex" justifyContent="flex-end">
                        <Typography gutterBottom variant="body3" component="div">
                            {props.pto.pto_reason}
                        </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Typography variant="body2" color="text.secondary">
                    {props.pto.pto_comment}
                </Typography>
                </Box>
            </CardContent>
        </CardActionArea>

    </Card></div>)
}