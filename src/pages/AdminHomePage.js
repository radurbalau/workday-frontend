import {useLocation} from "react-router-dom";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
import {Card, CardActionArea, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import AdminHomePageOnePtoUncheckedCard from "./AdminHomePageOnePtoUncheckedCard";
import AdminHomePageOnePtoCheckedCard from "./AdminHomePageOnePtoSolvedCard";
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" component={"div"} color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};


const AdminHomePage = () =>{
    const location = useLocation();
    const token = location.state.token;
    const [allPtoList,setAllPtoList] = useState([]);
    const [users,setUsers] = useState([])
    const [admins, setAdmins] = useState([])
    const [name_filter,setNameFilter] = useState('')

    useEffect(()=>{
        axios.get(process.env.REACT_APP_LOCAL_HOST + "/admin/all",{
            headers: {
                'Authorization': `${token}`
            }
        }).then((resp)=>{
            setAllPtoList(resp.data.item)
        })
    },[allPtoList])

    useEffect(()=>{

        axios.get(process.env.REACT_APP_LOCAL_HOST + "/admin/admin/all",{
            headers: {
                'Authorization': `${token}`
            }
        }).then((resp)=>{
            setAdmins(resp.data.item)
        })

    },[])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_LOCAL_HOST + "/admin/user/all",{
            headers: {
                'Authorization': `${token}`
            }
        }).then((resp)=>{
            setUsers(resp.data.item)
        })
    },[allPtoList])


        return(<div>
        <Grid  p={5} container spacing={3}>
        <Grid item xs={4} >
            <Box style={{backgroundColor:"#eeeeee"}} sx={{ maxWidth: 500 }}>
            <Box ml={3}>
                <Typography mt={5}  gutterBottom variant="h5" component={"div"}>
                    <b>Click on card to filter by user</b></Typography>
            </Box>
                <Box ml={1}>
            <div style={{marginTop:"10px",cursor:"pointer"}}>
                <Box p={1} >
                    <Card onClick={()=>{setNameFilter("")}} style={{backgroundColor:"#e0e0e0"}} sx={{ maxWidth: 450 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component={"div"}>
                                Click To Clear Filter
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </div>
            {users.map((user)=>{
                return (<div style={{marginTop:"10px",cursor:"pointer"}} key={user.user_id}>
                    <Box p={1} >
                    <Card onClick={()=>{setNameFilter(user.email.split("@")[0])}} style={{backgroundColor:"#e0e0e0"}} sx={{ maxWidth: 450 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component={"div"}>
                            {user.email}
                        </Typography>
                        {/*<button onClick={()=>{*/}
                        {/*    console.log(user.user_remaining_pto_days/user.user_pto_start_days)}}>dsadsdas</button>*/}
                        <Typography gutterBottom variant="h7" component={"div"}>
                          Nr of PTO used : <b>{user.user_pto_start_days - user.user_remaining_pto_days}</b>
                        </Typography>
                        <Typography component={"div"} variant="body2" color="text.secondary">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgressWithLabel value={100 - user.user_remaining_pto_days/user.user_pto_start_days*100} />
                            </Box>
                        </Typography>
                    </CardContent>
                </Card>
                    </Box>
                </div>)
            })}
            <Box mt={2}>
            <h2>Admin list</h2>
                {admins.map((admin)=>{
                    return (<div style={{marginTop:"10px"}} key={admin.admin_id}>
                        <Box p={1} >
                            <Card style={{backgroundColor:"#e0e0e0"}} sx={{ maxWidth: 450 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component={"div"}>
                                        {admin.email}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </div>)
                })}
            </Box>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={3.5}>
            {/*<button onClick={()=>{setNameFilter("raduadmin")}}> Filter By raduadmin</button>*/}

            <Typography mt={5} ml={2}  gutterBottom variant="h5" component={"div"}>
                <b>Pending Days Off Requests</b></Typography>
            <div>
            {allPtoList.filter((item)=>{if (name_filter !== '') {
                return name_filter === item.email.split("@")[0]
            }else{
                return true
            }
            }).filter(e=>{return e.admin_approved === null}).map((pto)=>{
                return <div style={{marginTop:"10px"}} key={pto.user_pto_dates_id}>
                    <AdminHomePageOnePtoUncheckedCard token={token} pto={pto}/>
                   </div>
            })}
            </div>
        </Grid>
        <Grid item xs={3.5}>
            <Typography mt={5} ml={2}  gutterBottom variant="h5" component={"div"}>
                <b>Solved Requests</b></Typography>
            {allPtoList.filter((item)=>{if (name_filter !== '') {
                return name_filter === item.email.split("@")[0]
            }else{
                return true
            }
            }).filter(e=>{return e.admin_approved !== null}).map((pto)=>{
                return <div style={{marginTop:"10px"}} key={pto.user_pto_dates_id}>
                    <AdminHomePageOnePtoCheckedCard token={token} pto={pto}/>
                </div>
            })}
        </Grid>

    </Grid>
        </div>)

}

export default AdminHomePage
