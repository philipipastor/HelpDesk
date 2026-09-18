import { Avatar } from "../../../../components/Avatar"
import { Button } from "../../../../components/Button"
import { Modal } from "../../../../components/Modal"
import { Input } from "../../../../components/Input"

import type { Client } from "../../../../types/Client"

import iconEdit from "../../../../assets/iconEdit.png"
import iconRemove from "../../../../assets/iconRemove.png"

import { useState } from "react"

type Props = {
    client: Client
}

export function ClientRow({ client }: Props) {
    const [modalDel, setModalDel] = useState<boolean>(false)
    const [modalEdit, setModalEdit] = useState<boolean>(false)

    return (
        <>
            <tr className="border-b border-gray-500 last:border-b-0">
                <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                        <Avatar name={client.name} />

                        <span className="text-sm font-medium text-gray-100">
                            {client.name}
                        </span>
                    </div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-200">
                    {client.email}
                </td>

                <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            variant="icon"
                            onClick={() => setModalDel(true)}
                        >
                            <img
                                src={iconRemove}
                                alt="ícone de remover"
                            />
                        </Button>

                        <Button
                            type="button"
                            variant="icon"
                            onClick={() => setModalEdit(true)}
                        >
                            <img
                                src={iconEdit}
                                alt="ícone de editar"
                            />
                        </Button>
                    </div>
                </td>
            </tr>

            {modalDel &&
                <Modal isOpen={modalDel} title="Excluir cliente" onClose={() => setModalDel(false)}>
                    
                    <p className="text-sm text-gray-200">
                        Deseja realmente exluir <strong>{client.name}</strong>
                    </p>
                       
                    <p className="mt-4 text-sm text-gray-200">
                        Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser desfeita.
                    </p>
                    <div className="-mx-6 mt-4 flex items-center gap-2 border-t border-gray-500 px-6 pt-6">
                        <Button className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-500 text-sm font-bold text-gray-100 hover:bg-gray-400 cursor-pointer" onClick={() => setModalDel(false)}>Cancelar</Button>

                        <Button className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">Sim, excluir</Button>
                    </div>
                </Modal>
            }

            {modalEdit &&
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
            }
        </>
    )
}
