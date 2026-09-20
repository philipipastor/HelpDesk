import { TicketTable } from "./components/Tickets/TicketTable"

export function Tickets() {
    return (
        <div className="w-full px-10 py-10">
            <header className="mb-6">
                <h1 className="text-xl font-semibold text-blue-dark">
                    Chamados
                </h1>
            </header>
            
            <TicketTable />
        </div>

    )
}
