import {Card, CardActionArea, CardContent, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LuggageIcon from '@mui/icons-material/Luggage';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {Home} from "@mui/icons-material";

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

        <Box style={{backgroundColor:"#ffa183"}} sx={{ maxWidth: 600 }}>
        <Card style={{backgroundColor:"#ffbba7"}} onClick={handleClickOpen} >
        <CardActionArea>
            <CardContent>
                <Box p={1} ml={1} mr={1}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.pto.email.split("@")[0]}
                </Typography>


                <Typography mb={1} variant="body2" color="text.secondary">
                    {props.pto.pto_comment}
                </Typography>

                    <Divider  />
                    <Box mt={1}>
                    <Grid container display={"flex"} spacing={1}>
                        <Grid item xs={6}>
                            <Grid
                                item
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                }}
                            >
                                <CalendarMonthIcon/>

                                <Typography
                                    color="textSecondary"
                                    display="inline"
                                    sx={{ pl: 1 }}
                                    variant="body2"
                                >
                                    {props.pto.pto_date_taken.split("T")[0]}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item  xs={6}>
                            <Box  display="flex" justifyContent="flex-end">
                            <Grid
                                item
                                sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                }}
                            >

                            <Box >
                                <Typography gutterBottom variant="body3" component="div">
                                    {props.pto.pto_reason}
                                </Typography>
                            </Box>
                                {props.pto.pto_reason === "regular" || props.pto.pto_reason === "Regular"?
                                    <LuggageIcon/>
                                    :
                                    <LocalHospitalIcon/>
                                }

                            </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    </Box>
                </Box>
            </CardContent>
        </CardActionArea>

    </Card>
        </Box>
    </div>)
}