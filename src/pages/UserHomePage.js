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
import LuggageIcon from '@mui/icons-material/Luggage';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import {
    Card,
    CardActions,
    CardContent,
    Divider,
    FormControlLabel,
    LinearProgress,
    Radio,
    RadioGroup
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DateRangeIcon from '@mui/icons-material/DateRange';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import {DoNotDisturb} from "@mui/icons-material";
const localizer = momentLocalizer(moment)

const UserHomePage = () =>{
    const userId = localStorage.getItem("user_id")
    const token = localStorage.getItem("token");
    const [selectedSlot,setSelectedSlot] = useState('')
    const [pto_comment, setPtoComment] = useState('');
    const [currentPtos, setCurrentPtos] = useState([])
    const [remainingPtos, setRemainingPtos] = useState(0)
    const [ptoReason, setPtoReason] = React.useState('regular');

    useEffect(()=>{
           axios.get(process.env.REACT_APP_LOCAL_HOST + "/users/pto/" + userId,{
               headers: {
                   'Authorization': `${token}`
               }
           }).then((resp)=>{
                setRemainingPtos(resp.data.item.user_remaining_pto_days)
           })

        axios.get(process.env.REACT_APP_LOCAL_HOST + "/users/pto/requests/" + userId,{
            headers: {
                'Authorization': `${token}`
            }
        }).then((resp)=>{
            setCurrentPtos([])
            for(let item of resp.data.item){
                let x = item.pto_date_taken.split("T")[0].split("-")
                const list_item={
                    "title":item.pto_reason,
                    "comment" : item.pto_comment,
                    "allDay": true,
                    "day":renderDate(item),
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
    //TODO: find a way to refresh table after a request was added
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e) => {
        setOpen(false);
    };

    const handleRadioValue = (event) => {
        setPtoReason(event.target.value);
    };

    const handleRequestPto = (e) => {
        console.log(pto_comment)
        console.log(selectedSlot)

        const list_item={
            "title":ptoReason,
            "comment" : pto_comment,
            "allDay": true,
            "start":selectedSlot,
            "end":selectedSlot,
            "admin_approved": null,
            "key": currentPtos.length + 1
        }
        setCurrentPtos((currentPtos)=> [...currentPtos,list_item])
        axios.post(process.env.REACT_APP_LOCAL_HOST + "/users/pto/" + userId, {
            "pto_date_taken": selectedSlot,
            "pto_reason": ptoReason,
            "pto_comment": pto_comment,
            "user_id": userId,
        },{
            headers: {
                'Authorization': `${token}`
            }}).then((resp)=>{
                console.log(resp)

        })
        // window.location.reload();
    };



    const handlePtoComment = event => {
        setPtoComment(event.target.value);
    };

    function isApprovedIcons(day){
        if(day.admin_approved === true)
            return (<CheckCircleIcon/> )
        else if (day.admin_approved === false){
            return(<DoNotDisturb/>)
        }else{
            return( <RadioButtonUncheckedIcon/>
            )
        }
    }

    function isApproved(day){
            if(day.admin_approved === true)
            return (
                <Typography  color="green">
                Approved
            </Typography> )
                else if (day.admin_approved === false){
                return(<Typography  color="red">
                Denied
            </Typography>)
                }else{
               return( <Typography  color="orange">
                    Pending
                </Typography>
               )
            }
    }

    function renderDate(day){
        console.log(day.pto_date_taken)
        return day.pto_date_taken.split("T")[0].replaceAll("-","/").split("/").reverse().join("/")
    }

//REGULA VACATION

    return(<div>
        <Box  p={7} sx={{ flexGrow: 1 }}>
            <Grid container spacing={5}>
                <Grid item xs={6}>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Day off details</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                This action will take one day off from your pto
                            </DialogContentText>
                            <Box ml={1} mt={2}>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={ptoReason}
                                    onChange={handleRadioValue}

                                >
                                    <FormControlLabel value="regular" control={<Radio />} label="Regular day off" />
                                    <FormControlLabel value="health" control={<Radio />} label="Health reason" />
                                </RadioGroup>
                            </Box>
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
                    <button onClick={()=>{console.log(currentPtos)}}>PLM</button>
                    <Box  >
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
                    </Box>
                </Grid>
                <Grid item xs={6} maxWidth={450}>
                    <Box ml={5} mr={20}>

                        <Card
                            sx={{ height: '100%' }}
                        >
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Grid item>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            variant="overline"
                                        >
                                            <b>Percent of days off used</b>
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            {Math.round(100 - remainingPtos/21 * 100)}%
                                        </Typography>
                                        <Typography
                                            color="textSecondary"
                                            variant="caption"
                                        >
                                            {remainingPtos} {" "} out of 21 remaining
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Avatar
                                            sx={{
                                                backgroundColor: 'warning.main',
                                                height: 56,
                                                width: 56
                                            }}
                                        >
                                        <LuggageIcon/>

                                        </Avatar>
                                    </Grid>
                                </Grid>
                                <Box sx={{ pt: 3 }}>
                                    <LinearProgress
                                        value={100 - remainingPtos/21 * 100}
                                        variant="determinate"
                                    />
                                </Box>
                            </CardContent>
                        </Card>

                    {/*<button onClick={()=>{console.log(currentPtos)}}>dsdsadsa</button>*/}

                        <Box mt={2} p={3} style={{backgroundColor:"lightgray"}}>


                            <Box mt={2}  style={{backgroundColor:"#eeeeee"}}>
                            <Grid sx={{border: 1,  borderColor: '#9e9e9e',
                            }} style={{textAlign: "center"}}>
                                <Typography mt={1}  gutterBottom variant="h5" component={"div"}>
                                    All Days off requested
                                </Typography>
                            </Grid>

                    {/*TODO: add filter for accepted/ denied/ ongoing */}
                    {/*TODO: Make user choose between types of day offs instead of typing*/}
                                {currentPtos.map((day)=>{
                                    return(

                                        <Card
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '100%',
                                                marginBottom:'20px'
                                            }}
                                        >
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        pb: 3
                                                    }}
                                                >

                                                </Box>
                                                <Typography
                                                    align="center"
                                                    color="textPrimary"
                                                    gutterBottom
                                                    variant="h5"
                                                >
                                                    {day.title}
                                                </Typography>
                                                <Typography
                                                    align="center"
                                                    color="textPrimary"
                                                    variant="body1"
                                                >
                                                    {day.comment}
                                                </Typography>
                                            </CardContent>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Divider />
                                            <Box sx={{ p: 2 }}>
                                                <Grid
                                                    container
                                                    spacing={2}
                                                    sx={{ justifyContent: 'space-between' }}
                                                >
                                                    <Grid
                                                        item
                                                        sx={{
                                                            alignItems: 'center',
                                                            display: 'flex'
                                                        }}
                                                    >
                                                        {isApprovedIcons(day)}
                                                        <Typography
                                                            color="textSecondary"
                                                            display="inline"
                                                            sx={{ pl: 1 }}
                                                            variant="body2"
                                                        >
                                                            {isApproved(day)}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        sx={{
                                                            alignItems: 'center',
                                                            display: 'flex'
                                                        }}
                                                    >
                                                        <DateRangeIcon/>
                                                        <Typography
                                                            color="textSecondary"
                                                            display="inline"
                                                            sx={{ pl: 1 }}
                                                            variant="body2"
                                                        >
                                                            {day.day}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Card>
                                    )
                                })}
                            </Box>

                        </Box>
                    </Box>

                </Grid>
            </Grid>
        </Box>
    </div>)

}

export default UserHomePage