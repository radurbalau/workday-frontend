import {useLocation} from "react-router-dom";


const AdminHomePage = () =>{
    const location = useLocation();

    return(<div> {location.state.token} </div>)
}

export default AdminHomePage
