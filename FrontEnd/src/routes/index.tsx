import { AuthRoutes } from "./authRoutes";
import { AdminRoutes } from "./adminRoutes";
import { ClientRoutes } from "./clientRoutes"
import { TechnicianRoutes } from "./technicianRoutes";

import { BrowserRouter } from "react-router";
import { useAuth } from "../hook/useAuth";

function Routes(){
    const { user } = useAuth()

    if(!user){
        return <AuthRoutes/>
    }

    switch(user.user.role) {
        case "admin":
            return <AdminRoutes/>

        case "client": 
            return <ClientRoutes/>

        case "technician":
            return <TechnicianRoutes/>

        default:
            return <AuthRoutes/>
    }
    }

export function Route(){
    return (
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
    )

}
