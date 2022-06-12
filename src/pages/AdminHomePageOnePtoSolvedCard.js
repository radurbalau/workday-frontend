import {Card, CardActionArea, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import Grid from "@mui/material/Grid";

export default function AdminHomePageOnePtoCheckedCard(props) {
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

    return (<div>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle >{"Alert !"}</DialogTitle>

            <DialogContent>
                You already {props.pto.admin_approved === true ?  "approved" : "denied"} this day off !
            </DialogContent>

            <DialogActions>
                {/*<Button onClick={handleApprove}>Save </Button>*/}
                <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
        </Dialog>
        <Card style={{backgroundColor: props.pto.admin_approved === true ? "#81c784" : "#e57373" }} onClick={handleClickOpen} sx={{ minWidth: 345 }}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.pto.email.split("@")[0]}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="body3" component="div">
                                {props.pto.pto_date_taken.split("T")[0]}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography gutterBottom variant="body3" component="div">
                                {props.pto.pto_reason.split("T")[0]}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="body2" color="text.secondary">
                        {props.pto.pto_comment}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card></div>)
}