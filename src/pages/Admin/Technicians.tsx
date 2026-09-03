import {Button} from "../../components/Button"
import { TechnicianTable } from "./components/Technicians/TechnicianTable"

export function Technicians() {
    return (
        <main>
            <header>
                <h1>Técnicos</h1>

                <Button>
                    + Novo
                </Button>
            </header>

            <TechnicianTable />
        </main>
    )
}