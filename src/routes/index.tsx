
import { AuthRoutes } from "./authRoutes";
import { AdminRoutes } from "./adminRoutes";
import { ClientRoutes } from "./clientRoutes"
import { TechnicianRoutes } from "./technicianRoutes";

export function Routes(){
    const user = {
        role: "technician"
    }

    if(!user){
        return <AuthRoutes/>
    }

    switch(user.role) {
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