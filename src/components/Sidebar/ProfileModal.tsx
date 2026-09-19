import { Modal } from "../Modal"
import { Button } from "../Button"
import { Input } from "../Input"
import { Avatar } from "../Avatar"
import type { User } from "../../types/User"
import type { UserRole } from "../../types/UserRole"
import type { Technician } from "../../types/technician"

type Props = {
    modal: boolean
    setModal: (open: boolean) => void
    setModalPassword: (open: boolean) => void
    user: User | null
    role: UserRole | undefined
    technician: Technician | undefined
}

export function ProfileModal({ modal, setModal, setModalPassword, user, role, technician }: Props) {
    return (
        <Modal isOpen={modal} title="Perfil" onClose={() => setModal(false)}>
            <form className="space-y-4 pt-1 text-gray-200 [&>div:first-child]:mb-5 [&>div:first-child]:size-12 [&>div:first-child]:text-base [&_fieldset]:mt-0 [&_legend]:text-[10px] [&_legend]:font-bold [&_legend]:leading-[1.4] [&_legend]:tracking-[0.6px] [&_input]:my-0 [&_input]:h-10 [&_input]:py-2 [&_input]:text-base [&_input]:leading-[1.4] [&_input]:text-gray-200">
                <Avatar name={user?.user.name ?? "Usuário"} />
                <Input legenda="Nome" value={user?.user.name} />
                <Input legenda="E-mail" value={user?.user.email} />
                <div className="relative mb-8 [&_input]:pr-16">
                    <Input legenda="Senha"/>
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
        
                        {technician?.availability.length
                            ?
                            (technician.availability.map(hours => <p key={hours} className="mt-2 mr-1 inline-flex h-7 items-center justify-center rounded-full border border-gray-500 px-3 text-xs font-bold leading-[1.4] text-gray-400">{hours}</p>))
                            :
                            <p className="mt-3 text-xs leading-[1.4] text-gray-400">Horários não disponíveis</p>
                        }
                    </div>
                )}
        
                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
