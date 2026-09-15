import { TicketTable } from "./components/TicketTable"

export function Tickets() {
    return (
        <main className="w-full px-10 py-10">
            <header className="mb-6">
                <h1 className="text-xl font-semibold text-blue-dark">
                    Meus Chamados
                </h1>
            </header>
            
            <TicketTable />
        </main>

    )
}