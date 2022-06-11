import {useLocation} from "react-router-dom";
import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {useEffect, useState} from "react";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@material-ui/core/Button";
import Typography from '@mui/material/Typography';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import {Card, CardActions, CardContent} from "@mui/material";

const localizer = momentLocalizer(moment)

const UserHomePage = () =>{
    const location = useLocation();
    // console.log(location.state)
    const userId = location.state.user_id
    const token = location.state.token;
    const [selectedSlot,setSelectedSlot] = useState('')
    const [pto_reason, setPtoReason] = useState('');
    const [pto_comment, setPtoComment] = useState('');
    const [currentPtos, setCurrentPtos] = useState([])
    const [remainingPtos, setRemainingPtos] = useState(0)

    useEffect(()=>{
           axios.get(process.env.REACT_APP_LOCAL_HOST + "/users/pto/" + userId,{
               headers: {
                   'Authorization': `${token}`
               }
           }).then((resp)=>{
                setRemainingPtos(resp.data.item.user_remaining_pto_days)
           })

        //TODO: put an observer here
        axios.get(process.env.REACT_APP_LOCAL_HOST + "/users/pto/requests/" + userId,{
            headers: {
                'Authorization': `${token}`
            }
        }).then((resp)=>{
            setCurrentPtos([])
            for(let item of resp.data.item){
                let x = item.pto_date_taken.split("T")[0].split("-")
                console.log("x = " + x )
                const list_item={
                    "title":item.pto_reason,
                    "comment" : item.pto_comment,
                    "allDay": true,
                    "start":new Date(item.pto_date_taken),
                    "end":new Date(item.pto_date_taken),
                    "admin_approved": item.admin_approved,
                    "key":item.user_pto_dates_id
                }
                console.log(list_item)
                setCurrentPtos((currentPtos)=> [...currentPtos,list_item])
            }
            console.log(currentPtos)
        })
    },[])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const handleRequestPto = (e) => {
        console.log(pto_reason)
        console.log(pto_comment)
        console.log(selectedSlot)
        const list_item={
            "title":pto_reason,
            "comment" : pto_comment,
            "allDay": true,
            "start":new Date(selectedSlot),
            "end":new Date(selectedSlot),
            "admin_approved": null,
            "key": currentPtos.length + 1
        }
        setCurrentPtos((currentPtos)=> [...currentPtos,list_item])
        axios.post(process.env.REACT_APP_LOCAL_HOST + "/users/pto/" + userId, {
            "pto_date_taken": selectedSlot,
            "pto_reason": pto_reason,
            "pto_comment": pto_comment,
            "user_id": userId,
        },{
            headers: {
                'Authorization': `${token}`
            }}).then((resp)=>{
                console.log(resp)
        })
        window.location.reload();
    };

    const handlePtoReason = event => {
        setPtoReason(event.target.value);
    };

    const handlePtoComment = event => {
        setPtoComment(event.target.value);
    };

    function isApproved(day){
            if(day.admin_approved === true)
            return (<Typography sx={{ mb: 1.5 }} color="green">
                Approved
            </Typography> )
                else if (day.admin_approved === false){
                return(<Typography sx={{ mb: 1.5 }} color="red">
                Denied
            </Typography>)
                }else{
               return( <Typography sx={{ mb: 1.5 }} color="orange">
                    Pending
                </Typography>
               )
            }
    }

    function renderDate(day){
        let a = (new Date(day.start).toISOString())
        return a.split("T")[0].replaceAll("-","/").split("/").reverse().join("/")
    }

    return(<div>
        <Box  p={7} sx={{ flexGrow: 1 }}>
            <Grid container spacing={5}>
                <Grid item xs={5}>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                This action will take one day off from your pto
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Regular / Health reason"
                                type="Pto Reason"
                                fullWidth
                                variant="standard"
                                value= {pto_reason}
                                onChange= {handlePtoReason}
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Pto Comment"
                                type="Pto comment"
                                fullWidth
                                variant="standard"
                                value= {pto_comment}
                                onChange= {handlePtoComment}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleRequestPto}>Request PTO</Button>
                            <Button onClick={handleClose}>Ok</Button>
                        </DialogActions>
                    </Dialog>
                    <Calendar
                        localizer={localizer}
                        events={currentPtos}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        onSelectSlot={(slotInfo) => {
                            console.log(slotInfo)
                            let a = (new Date(slotInfo.end).toISOString())
                            console.log(a)
                            setSelectedSlot(a.split("T")[0].replaceAll("-","/").split("/").reverse().join("/")
                        )
                            handleClickOpen()
                        }}
                        selectable
                        popup={true}
                    />
                </Grid>
                <Grid item xs={7}>
                    Remaining User Ptos  : {remainingPtos}
                    <button onClick={()=>{console.log(currentPtos)}}>dsdsadsa</button>

                    <h2>All Paid time offs :</h2>
                    {/*TODO: add filter for accepted/ denied/ ongoing */}
                    {/*TODO: Make user choose between types of day offs instead of typing*/}
                    {currentPtos.map((day)=>{
                        return(<div style={{marginTop:"10px"}} key={day.key}><Card variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Grid container spacing={5}>
                                    <Grid item xs={5}>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                            Type of day off
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {day.title}
                                        </Typography>
                                        {isApproved(day)}

                                        <Typography variant="body2">
                                            {day.comment}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={4}>
                                        {renderDate(day)}
                                        </Grid>
                                </Grid>

                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                            </CardActions>
                        </Card></div>)
                    })}
                </Grid>
            </Grid>
        </Box>
    </div>)

}

export default UserHomePage