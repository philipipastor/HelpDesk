import { Modal } from "../../../../components/Modal"
import { Button } from "../../../../components/Button"
import { Input } from "../../../../components/Input"
import type { Service } from "../../../../types/Services"

type Props = {
    modal: boolean
    setModal: (open: boolean) => void
    service: Service
}

export function EditServiceModal({ modal, setModal, service }: Props) {
    function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        alert("editado")
    }

    return (
        <Modal isOpen={modal} title="Serviço" onClose={() => setModal(false)}>
            <form onSubmit={onSubmit} className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
                <Input legenda="Descrição" aria-label="Descrição" placeholder="Descrição do serviço" defaultValue={service.title} required pattern=".*\S.*" />
                <Input legenda="Valor" aria-label="Valor em reais" type="number" min="0.01" step="0.01" placeholder="0,00" defaultValue={service.amount} required />
                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button type="submit" className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
