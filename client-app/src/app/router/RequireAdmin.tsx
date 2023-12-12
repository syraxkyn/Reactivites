import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../stores/store";
import { toast } from "react-toastify";

export default function RequireAdmin() {
    const {userStore:{isAdmin}} = useStore();
    const location = useLocation();

    if(!isAdmin){
        toast.error('forbidden');
        return <Navigate to='/posts' state={{from: location}}/>
    }

    return <Outlet />
}