import { Routes, Route } from "react-router"

import { Technicians } from "../pages/Admin/Technicians"
import { Client } from "../pages/Admin/Client"
import { NotFound } from "../pages/NotFound"

export function AdminRoutes(){
    return (
    <Routes>
        <Route path="/" element={<Technicians/>} />
        <Route path="/clients" element={<Client/>} />

        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
}