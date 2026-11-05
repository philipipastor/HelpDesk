import { TicketTable } from "./components/TicketTable"

export function Tickets() {
    return (
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <header className="mb-6">
                <h1 className="text-xl font-semibold text-blue-dark">
                    Meus Chamados
                </h1>
            </header>
            
            <TicketTable />
        </div>

    )
}
