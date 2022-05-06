
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const NotFound = () =>{
    let navigate = useNavigate();

    return (
        <div style={{textAlign:"center",display:"block",marginLeft:"auto",marginRight:"auto",width:"500px"}}>
            <img  src={require('../images/not_found.png')} />
            <Button variant="contained" onClick={()=>{
                navigate("/home")
            }}>Back To Base</Button>

        </div>
    )
}

export  default  NotFound;