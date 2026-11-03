import { Outlet } from "react-router";
import { Sidebar } from "../Sidebar"

export function AppLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100 lg:flex-row lg:bg-gray-600"> 
            <Sidebar/>

            <main className="min-w-0 flex-1 rounded-t-2xl bg-gray-600 wrap-anywhere lg:rounded-none">
                <Outlet/>
            </main>
        </div>
    )
}
