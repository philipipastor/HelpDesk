import { Modal } from "../Modal"
import { Button } from "../Button"
import { Input } from "../Input"
import { Avatar } from "../Avatar"

import type { User } from "../../types/User"
import type { UserRole } from "../../types/UserRole"

import { api } from "../../services/api"
import { useAuth } from "../../hook/useAuth"
import { getErrorMessage } from "../../utils/GetErrorMessage"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

type Props = {
    modal: boolean
    setModal: (open: boolean) => void
    setModalPassword: (open: boolean) => void
    user: User | null
    role: UserRole | undefined
}

const schema = z.object({
    name: z.string().trim().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().trim().email("Insira um e-mail válido")
})

type ProfileData = z.infer<typeof schema>

export function ProfileModal({ modal, setModal, setModalPassword, user, role }: Props) {
    const { updateUser, signOut } = useAuth()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [availability, setAvailability] = useState(user?.user.availability ?? [])

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: user?.user.name ?? "",
            email: user?.user.email ?? ""
        }
    })

    // O admin pode ter alterado os horários depois do login.
    useEffect(() => {
        async function fetchAvailability() {
            try {
                const response = await api.get<User["user"]>("/users/me")
                setAvailability(response.data.availability)
            } catch (error) {
                setError(getErrorMessage(error, "Não foi possível carregar os horários"))
            }
        }

        if (role === "technician") {
            fetchAvailability()
        }
    }, [role])

    async function onSubmit(data: ProfileData) {
        try {
            setError("")
            const response = await api.patch<User["user"]>("/users/me", data)
            updateUser(response.data)
            setModal(false)
        } catch (error) {
            setError(getErrorMessage(error, "Não foi possível salvar o perfil"))
        }
    }

    async function deleteAccount() {
        if (!confirm("Deseja realmente excluir sua conta? Todos os seus chamados serão removidos e esta ação não poderá ser desfeita.")) {
            return
        }

        try {
            await api.delete("/users/me")
            signOut()
            navigate("/", { replace: true })
        } catch (error) {
            setError(getErrorMessage(error, "Não foi possível excluir a conta"))
        }
    }

    return (
        <Modal isOpen={modal} title="Perfil" onClose={() => setModal(false)}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 pt-1 text-gray-200 [&>div:first-child]:mb-5 [&>div:first-child]:size-12 [&>div:first-child]:text-base [&_fieldset]:mt-0 [&_legend]:text-[10px] [&_legend]:font-bold [&_legend]:leading-[1.4] [&_legend]:tracking-[0.6px] [&_input]:my-0 [&_input]:h-10 [&_input]:py-2 [&_input]:text-base [&_input]:leading-[1.4] [&_input]:text-gray-200">
                <Avatar name={user?.user.name ?? "Usuário"} />
                <Input legenda="Nome" autoComplete="name" {...register("name")} />
                {errors.name && (
                    <p id="profile-name-error" role="alert" className="text-xs text-feedback-danger">
                        {errors.name.message}
                    </p>
                )}

                <Input legenda="E-mail" type="email" autoComplete="email" {...register("email")} />
                {errors.email && (
                    <p id="profile-email-error" role="alert" className="text-xs text-feedback-danger">
                        {errors.email.message}
                    </p>
                )}

                <div className="relative mb-8 [&_input]:pr-16">
                    <Input legenda="Senha" type="password" placeholder="••••••••" value="" readOnly />

                    <button
                        type="button"
                        className="absolute right-0 bottom-2 flex h-7 items-center justify-center rounded-[5px] bg-gray-500 px-2 text-xs font-bold text-gray-200 cursor-pointer transition-colors hover:bg-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-base"
                        onClick={() => {
                            setModal(false)
                            setModalPassword(true)
                        }}
                    >
                        Alterar
                    </button>
                </div>


                {role === "technician" && (
                    <div className="-mx-6 mb-0 border-t border-gray-500 px-6 py-5">
                        <p className="text-sm font-bold leading-[1.4] text-gray-200">Disponibilidade</p>
                        <p className="mb-1 text-xs leading-[1.4] text-gray-300">Horários de atendimento definidos pelo admin</p>

                        {availability.length
                            ?
                            (availability.map(hours => <p key={hours} className="mt-2 mr-1 inline-flex h-7 items-center justify-center rounded-full border border-gray-500 px-3 text-xs font-bold leading-[1.4] text-gray-400">{hours}</p>))
                            :
                            <p className="mt-3 text-xs leading-[1.4] text-gray-400">Horários não disponíveis</p>
                        }
                    </div>
                )}

                {role === "client" && (
                    <button
                        type="button"
                        onClick={deleteAccount}
                        className="text-xs font-bold text-feedback-danger cursor-pointer hover:opacity-70"
                    >
                        Excluir minha conta
                    </button>
                )}

                {error && (
                    <p role="alert" className="text-xs text-feedback-danger">
                        {error}
                    </p>
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
