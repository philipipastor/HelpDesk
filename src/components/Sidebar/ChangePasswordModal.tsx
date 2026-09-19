import { Modal } from "../Modal"
import { Button } from "../Button"
import { Input } from "../Input"
import iconArrowLeft from "../../assets/arrow-left.png"

type Props = {
    modalPassword: boolean
    setModalPassword: (open: boolean) => void
    setModal: (open: boolean) => void
}

export function ChangePasswordModal({ modalPassword, setModalPassword, setModal }: Props) {
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
            <form className="space-y-4 pt-1 text-gray-200 [&_fieldset]:mt-0 [&_legend]:text-[10px] [&_legend]:font-bold [&_legend]:leading-[1.4] [&_legend]:tracking-[0.6px] [&_input]:my-0 [&_input]:h-10 [&_input]:py-2 [&_input]:text-base [&_input]:leading-[1.4] [&_input]:text-gray-200 [&>div:nth-child(2)]:mb-1.5">
                <Input legenda="Senha atual" type="password" placeholder="Digite sua senha atual" />
                <Input legenda="Nova senha" type="password"  placeholder="Digite sua nova senha"/>
                <p className="mb-8 text-xs italic leading-[1.4] text-gray-400">Mínimo de 6 dígitos</p>
        
                <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                    <Button className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                        Salvar
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
