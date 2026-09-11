import { Button } from "../../components/Button"
import { ServicesTable } from "./components/Services/ServicesTable"
import { Modal } from "../../components/Modal"
import { Input } from "../../components/Input"

import { useState } from "react"

export function Services() {
    const [modal, setModal] = useState<boolean>(false)

    return (
        <>
            <main className="w-full px-8 py-10">
                <header className="mb-6 space-between flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-[#2E3DA3]">
                        Serviços
                    </h1>  
                    <Button onClick={() => setModal(true)} variant="btnMedium"> + Novo </Button>
                </header>
                
                <ServicesTable />
            </main>
            {modal && 
                <Modal isOpen={modal} title="Cadastro de serviço" onClose={() => setModal(false)}>
                    <form>
                        <Input legenda="Título" placeholder="Nome do serviço"/>
                        <Input legenda="Valor" value="R$" placeholder="0,00"/>
                        <Button>Salvar</Button>
                    </form>
                </Modal>
            }
        </>
    )
}