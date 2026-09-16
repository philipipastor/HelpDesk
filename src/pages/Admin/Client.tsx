import { ClientTable } from "./components/Clients/ClientTable"

export function Client() {
    return (
        <main className="w-full px-8 py-10">
            <header className="mb-6">
                <h1 className="text-xl font-semibold text-blue-dark">
                    Clientes
                </h1>
            </header>

            <ClientTable />
        </main>
    )
}