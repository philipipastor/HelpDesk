import { Modal } from "../../../../components/Modal"
import { Button } from "../../../../components/Button"
import { Input } from "../../../../components/Input"
import { Avatar } from "../../../../components/Avatar"
import type { Client } from "../../../../types/Client"
import { api } from "../../../../services/api"
import { getErrorMessage } from "../../../../utils/GetErrorMessage"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
    name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().trim().email("Insira um e-mail válido")
})

type EditClientData = z.infer<typeof schema>

type Props = {
    modalEdit: boolean
    setModalEdit: (open: boolean) => void
    client: Client
    onChanged: () => void
}

export function EditClientModal({ modalEdit, setModalEdit, client, onChanged }: Props) {
    const [error, setError] = useState("")

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EditClientData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: client.name,
            email: client.email
        }
    })

    async function onSubmit(data: EditClientData) {
        try {
            setError("")
            await api.put(`/clients/${client.id}`, data)
            setModalEdit(false)
            onChanged()
        } catch (error) {
            setError(getErrorMessage(error, "Não foi possível salvar o cliente"))
        }
    }

    return (
        <Modal isOpen={modalEdit} title="Cliente" onClose={() => setModalEdit(false)}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
                <Avatar name={client.name}/>
                <Input legenda="Nome" autoComplete="name" {...register("name")}/>
                {errors.name && (
                    <p id="client-name-error" role="alert" className="text-xs text-feedback-danger">{errors.name.message}</p>
                )}

                <Input legenda="E-mail" type="email" autoComplete="email" {...register("email")}/>
                {errors.email && (
                    <p id="client-email-error" role="alert" className="text-xs text-feedback-danger">{errors.email.message}</p>
                )}

                {error && (
                    <p role="alert" className="text-xs text-feedback-danger">{error}</p>
                )}

                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button type="submit" disabled={isSubmitting} className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        {isSubmitting ? "Salvando" : "Salvar"}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
