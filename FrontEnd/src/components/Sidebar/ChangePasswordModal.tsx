import { Modal } from "../Modal"
import { Button } from "../Button"
import { Input } from "../Input"

import iconArrowLeft from "../../assets/arrow-left.png"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
    currentPassword: z.string().min(1, "Informe sua senha atual").min(6, "A senha atual deve ter pelo menos 6 caracteres"),
    newPassword: z.string().min(1, "Informe sua nova senha").min(6, "A nova senha deve ter pelo menos 6 caracteres")
})

type ChangePasswordData = z.infer<typeof schema>

type Props = {
    modalPassword: boolean
    setModalPassword: (open: boolean) => void
    setModal: (open: boolean) => void
}

export function ChangePasswordModal({ modalPassword, setModalPassword, setModal }: Props) {
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordData>({
        resolver: zodResolver(schema),
        defaultValues: {
            currentPassword: "",
            newPassword: ""
        }
    })

    function onSubmit() {
        // A confirmação da senha atual e o salvamento serão feitos pela API.
    }

    return (
        <Modal
            isOpen={modalPassword}
            title={
                <span className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex size-6 items-center justify-center rounded cursor-pointer hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-base"
                        onClick={() => {
                            setModalPassword(false)
                            setModal(true)
                        }}
                    >
                        <img src={iconArrowLeft} alt="" className="size-4.5" />
                    </button>
                    Alterar senha
                </span>
            }
            onClose={() => setModalPassword(false)}
        >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 pt-1 text-gray-200 [&_fieldset]:mt-0 [&_legend]:text-[10px] [&_legend]:font-bold [&_legend]:leading-[1.4] [&_legend]:tracking-[0.6px] [&_input]:my-0 [&_input]:h-10 [&_input]:py-2 [&_input]:text-base [&_input]:leading-[1.4] [&_input]:text-gray-200 [&>div:nth-of-type(2)]:mb-1.5">
                <Input
                    legenda="Senha atual"
                    type="password"
                    placeholder="Digite sua senha atual"
                    autoComplete="current-password"
                    {...register("currentPassword")}
                />
                {errors.currentPassword && (
                    <p id="current-password-error" role="alert" className="text-xs text-feedback-danger">
                        {errors.currentPassword.message}
                    </p>
                )}
                <Input
                    legenda="Nova senha"
                    type="password"
                    placeholder="Digite sua nova senha"
                    autoComplete="new-password"
                    {...register("newPassword")}
                />
                {errors.newPassword && (
                    <p id="new-password-error" role="alert" className="text-xs text-feedback-danger">
                        {errors.newPassword.message}
                    </p>
                )}
                <p className="mb-8 text-xs italic leading-[1.4] text-gray-400">Mínimo de 6 dígitos</p>
        
                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button type="submit" className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
