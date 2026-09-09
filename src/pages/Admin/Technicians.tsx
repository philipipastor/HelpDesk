import {Button} from "../../components/Button"
import { TechnicianTable } from "./components/Technicians/TechnicianTable"

export function Technicians() {
    return (
        <main className="w-full px-8 py-10">
            <header className="mb-6 space-between flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#2E3DA3]">
                    Técnicos
                </h1>

                <Button variant="btnMedium">
                    + Novo
                </Button>
            </header>

            <TechnicianTable />
        </main>
    )
}