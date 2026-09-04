import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar"

export function AppLayout() {
    return (
        <div className="flex min-h-screen"> 
            <Sidebar role="admin"/>

            <main className="flex-1">
                <Outlet/>
            </main>
        </div>
    )
}