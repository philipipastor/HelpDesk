
import { AuthRoutes } from "./authRoutes";
import { AdminRoutes } from "./adminRoutes";
import { ClientRoutes } from "./clientRoutes"
import { TechnicianRoutes } from "./technicianRoutes";
import type { UserRole } from "../types/UserRole"

export function Routes(){
    const user: { role: UserRole } = {
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
