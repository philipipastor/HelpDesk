import { Button } from "../../components/Button"
import { ServicesTable } from "./components/Services/ServicesTable"

export function Services() {
    return (
        <main className="w-full px-8 py-10">
            <header className="mb-6 space-between flex items-center justify-between">
                <h1 className="text-xl font-semibold text-[#2E3DA3]">
                    Serviços
                </h1>  
                <Button variant="btnMedium"> + Novo </Button>
            </header>
            
            <ServicesTable />
        </main>
    )
}