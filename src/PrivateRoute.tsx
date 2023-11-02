import { useAuth } from "./AuthContext"
import { Navigate } from "react-router"


const PrivateRoute = ({ children } : any) => {

    const {currenUser} = useAuth()

    if (currenUser === null){
        return <Navigate to='/login' />
    } else {
        return children;
    }
}

export default PrivateRoute
