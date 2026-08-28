import { Routes, Route } from "react-router"

import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"
import { AuthLayout } from "../components/AuthLayout"
import { NotFound } from "../pages/NotFound"


export function AuthRoutes(){
    return(
    <Routes>
        <Route element={<AuthLayout/>}>
            <Route path="/" element={<SignIn/>}/>
            <Route path="/cadastro" element={<SignUp/>}/>
        </Route>

        <Route path="*" element={<NotFound/>}/>

    </Routes>
    )

}