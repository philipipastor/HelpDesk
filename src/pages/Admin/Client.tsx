import { Button } from "../../components/Button"

import { ClientTable } from "./components/Clients/ClientTable"

export function Client() {
    return (
        <main>
            <header>
                <h1>Clientes</h1>  
                <Button> + Novo </Button>
            </header>

            <ClientTable />   
        </main>
    )
}