import { Modal } from "../../../../components/Modal"
import { Button } from "../../../../components/Button"
import { Input } from "../../../../components/Input"
import type { Service } from "../../../../types/Services"
import { serviceSchema, type ServiceFormData } from "./serviceFormSchema"
import { api } from "../../../../services/api"
import { getErrorMessage } from "../../../../utils/GetErrorMessage"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
    modal: boolean
    setModal: (open: boolean) => void
    service: Service
    onChanged: () => void
}

export function EditServiceModal({ modal, setModal, service, onChanged }: Props) {
    const [error, setError] = useState("")

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: service.title,
            amount: String(service.amount)
        }
    })

    async function onSubmit(data: ServiceFormData) {
        try {
            setError("")
            await api.put(`/services/${service.id}`, {
                title: data.title,
                amount: Number(data.amount.replace(",", "."))
            })
            setModal(false)
            onChanged()
        } catch (error) {
            setError(getErrorMessage(error, "Não foi possível salvar o serviço"))
        }
    }

    return (
        <Modal isOpen={modal} title="Serviço" onClose={() => setModal(false)}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
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

                {error &&
                    <p role="alert" className="text-xs text-feedback-danger">{error}</p>}

                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button type="submit" disabled={isSubmitting} className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        {isSubmitting ? "Salvando" : "Salvar"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
