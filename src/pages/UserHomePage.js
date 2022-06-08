import {useLocation} from "react-router-dom";


const UserHomePage = () =>{
    const location = useLocation();

    return(<div> {location.state.token} </div>)
}

export default UserHomePage