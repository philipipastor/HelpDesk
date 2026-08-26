import { Routes, Route } from "react-router"

import { SingIn } from "../pages/SingIn"
import { SingUp } from "../pages/SingUp"
import { AuthLayout } from "../components/AuthLayout"
import { NotFound } from "../pages/NotFound"


export function AuthRoutes(){
    return(
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path="/" element={<SingIn/>}/>
            <Route path="/cadastro" element={<SingUp/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>

    </Routes>
    )

}