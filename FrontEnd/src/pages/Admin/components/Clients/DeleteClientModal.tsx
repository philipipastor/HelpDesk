import { Modal } from "../../../../components/Modal"
import { Button } from "../../../../components/Button"
import type { Client } from "../../../../types/Client"
import { api } from "../../../../services/api"
import { getErrorMessage } from "../../../../utils/GetErrorMessage"
import { useState } from "react"

type Props = {
    modalDel: boolean
    setModalDel: (open: boolean) => void
    client: Client
    onChanged: () => void
}

export function DeleteClientModal({ modalDel, setModalDel, client, onChanged }: Props) {
    const [error, setError] = useState("")

    async function deleteClient() {
        try {
            setError("")
            await api.delete(`/clients/${client.id}`)
            setModalDel(false)
            onChanged()
        } catch (error) {
            setError(getErrorMessage(error, "Não foi possível excluir o cliente"))
        }
    }

    return (
        <Modal isOpen={modalDel} title="Excluir cliente" onClose={() => setModalDel(false)}>
            
            <p className="text-sm text-gray-200">
                Deseja realmente excluir <strong>{client.name}</strong>?
            </p>
               
            <p className="mt-4 text-sm text-gray-200">
                Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser desfeita.
            </p>
            {error && (
                <p role="alert" className="mt-4 text-xs text-feedback-danger">{error}</p>
            )}
            <div className="-mx-6 mt-4 flex items-center gap-2 border-t border-gray-500 px-6 pt-6">
                <Button className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-500 text-sm font-bold text-gray-100 hover:bg-gray-400 cursor-pointer" onClick={() => setModalDel(false)}>Cancelar</Button>
        
                <Button className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer" onClick={deleteClient}>Sim, excluir</Button>
            </div>
        </Modal>
    )
}
