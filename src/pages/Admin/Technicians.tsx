import {Button} from "../../components/Button"
import { TechnicianTable } from "./Technicians/components/TechnicianTable/index"

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