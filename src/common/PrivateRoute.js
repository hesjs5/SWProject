import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute: React.FC = () => {
    const hasToken = !!localStorage.getItem("accessToken");
    console.log("hasToken = ", hasToken);
    return hasToken ? <Outlet/> : <Navigate to="/login"/>
}

export default PrivateRoute;