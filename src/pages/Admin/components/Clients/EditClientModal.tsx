import { Modal } from "../../../../components/Modal"
import { Button } from "../../../../components/Button"
import { Input } from "../../../../components/Input"
import { Avatar } from "../../../../components/Avatar"
import type { Client } from "../../../../types/Client"

type Props = {
    modalEdit: boolean
    setModalEdit: (open: boolean) => void
    client: Client
}

export function EditClientModal({ modalEdit, setModalEdit, client }: Props) {
    return (
        <Modal isOpen={modalEdit} title="Cliente" onClose={() => setModalEdit(false)}>
            <form className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
                <Avatar name={client.name}/>
                <Input legenda="Nome" defaultValue={client.name}/>
                <Input legenda="E-mail" defaultValue={client.email}/>
                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
