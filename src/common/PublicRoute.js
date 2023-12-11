import {Navigate, Outlet} from "react-router-dom";

const PublicRoute: React.FC = () => {
    const hasToken = !!localStorage.getItem("token");
    console.log("hasToken = ", hasToken);
    return hasToken ? <Navigate to="/boards"/> : <Outlet/>
}

export default PublicRoute;