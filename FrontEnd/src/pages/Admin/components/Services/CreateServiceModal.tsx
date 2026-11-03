import { Modal } from "../../../../components/Modal"
import { Button } from "../../../../components/Button"
import { Input } from "../../../../components/Input"
import type { ComponentProps } from "react"
import type { FieldErrors, UseFormRegister } from "react-hook-form"

type ServiceFormData = {
    title: string
    amount: string
}

type Props = {
    modal: boolean
    setModal: (open: boolean) => void
    register: UseFormRegister<ServiceFormData>
    errors: FieldErrors<ServiceFormData>
    isSubmitting: boolean
    onSubmit: ComponentProps<"form">["onSubmit"]
}

export function CreateServiceModal({ modal, setModal, register, errors, isSubmitting, onSubmit }: Props) {
    return (
        <Modal isOpen={modal} title="Cadastro de serviço" onClose={() => setModal(false)}>
            <form onSubmit={onSubmit} className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
                <Input legenda="Título" placeholder="Nome do serviço" {...register("title")} />
                {errors.title && 
                    <p id="title-error" role="alert" className="text-xs text-feedback-danger">
                        {errors.title.message}
                    </p>}

                <Input legenda="Valor" inputMode="decimal" placeholder="R$ 0,00" {...register("amount")} />
                {errors.amount && 
                    <p id="amount-error" role="alert" className="text-xs text-feedback-danger">
                        {errors.amount.message}
                    </p>}

                {errors.root?.server?.message && 
                    <p role="alert" className="text-xs text-feedback-danger">
                        {errors.root.server.message}
                    </p>
                }

                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        {isSubmitting ? "Salvando" : "Salvar"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
