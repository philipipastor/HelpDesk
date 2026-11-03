import {Button} from "../../components/Button"
import { TechnicianTable } from "./components/Technicians/TechnicianTable"
import { useNavigate } from "react-router"

export function Technicians() {
    const navigate = useNavigate()
    return (
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <header className="mb-6 flex flex-wrap items-center justify-between gap-3 [&>button]:mt-0 max-lg:[&>button]:size-9">
                <h1 className="text-xl font-semibold text-blue-dark">
                    Técnicos
                </h1>

                <Button variant="btnMedium" onClick={() => navigate("/tecnicos/novo")}>
                    +<span className="sr-only lg:not-sr-only"> Novo</span>
                </Button>
            </header>

            <TechnicianTable />
        </div>
    )
}
