import { Button } from "../../components/Button"
import { ServicesTable } from "./components/Services/ServicesTable"

export function Services() {
    return (
        <main>
            <header>
                <h1>Serviços</h1>  
                <Button> + Novo </Button>
            </header>
            
            <ServicesTable />
        </main>
    )
}