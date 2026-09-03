import { BrowserRouter } from "react-router";

//import { AuthRoutes } from "./authRoutes";
import { AdminRoutes } from "./adminRoutes";

export function Routes(){
    return(
        <BrowserRouter>
            <AdminRoutes/>
        </BrowserRouter>
    )
}