import {Button} from "../../components/Button"
import { TechnicianTable } from "./components/Technicians/TechnicianTable"
import { useNavigate } from "react-router"

export function Technicians() {
    const navigate = useNavigate()
    return (
        <main className="w-full px-8 py-10">
            <header className="mb-6 space-between flex items-center justify-between">
                <h1 className="text-xl font-semibold text-blue-dark">
                    Técnicos
                </h1>

                <Button variant="btnMedium" onClick={() => navigate("/tecnicos/novo")}>
                    + Novo
                </Button>
            </header>

            <TechnicianTable />
        </main>
    )
}
