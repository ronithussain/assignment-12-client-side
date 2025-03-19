import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();
    // console.log(location)
    if(loading || isAdminLoading){
        return <progress className="progress w-80"></progress>
    }
    if (!user && isAdmin) {
        return <Navigate to="/login" state={{ from: location}} replace />;
    }
    return children;
    
};

export default AdminRoute;