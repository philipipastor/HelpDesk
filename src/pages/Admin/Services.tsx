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
                    <h1 className="text-xl font-semibold text-blue-dark">
                        Serviços
                    </h1>
                    <Button onClick={() => setModal(true)} variant="btnMedium"> + Novo </Button>
                </header>

                <ServicesTable />
            </main>
            {modal &&
                <Modal isOpen={modal} title="Cadastro de serviço" onClose={() => setModal(false)}>
                    <form onSubmit={() => alert("cadastrado")} className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
                        <Input legenda="Título" placeholder="Nome do serviço" />
                        <Input legenda="Valor" value="R$" placeholder="0,00" />

                        <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                            <Button 
                            type="submit" 
                            className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                                Salvar
                            </Button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    )
}