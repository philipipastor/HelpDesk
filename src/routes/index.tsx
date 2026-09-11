
import { AuthRoutes } from "./authRoutes";
import { AdminRoutes } from "./adminRoutes";
import { ClientRoutes } from "./clientRoutes"

export function Routes(){
    const user = {
        role: "admin"
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
            return

        default:
            return <AuthRoutes/>
    }
}