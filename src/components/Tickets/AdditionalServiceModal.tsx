import { Modal } from "../Modal"
import { Button } from "../Button"
import { Input } from "../Input"

type Props = {
    modal: boolean
    setModal: (open: boolean) => void
    description: string
    setDescription: (value: string) => void
    amount: string
    setAmount: (value: string) => void
    saveAdditionalService: (event: React.FormEvent<HTMLFormElement>) => void
}

export function AdditionalServiceModal({ modal, setModal, description, setDescription, amount, setAmount, saveAdditionalService }: Props) {
    return (
        <Modal
            isOpen={modal}
            title="Serviço adicional"
            onClose={() => setModal(false)}
        >
            <form id="additional-service-form" onSubmit={saveAdditionalService} className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
                <Input legenda="Descrição" aria-label="Descrição" placeholder="Descrição do serviço" value={description} onChange={event => setDescription(event.target.value)} required pattern=".*\S.*" />
                <Input legenda="Valor" aria-label="Valor em reais" type="number" min="0.01" step="0.01" placeholder="0,00" value={amount} onChange={event => setAmount(event.target.value)} required />
                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button type="submit" className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
