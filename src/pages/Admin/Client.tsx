import { ClientTable } from "./components/Clients/ClientTable"

export function Client() {
    return (
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <header className="mb-6">
                <h1 className="text-xl font-semibold text-blue-dark">
                    Clientes
                </h1>
            </header>

            <ClientTable />
        </div>
    )
}
