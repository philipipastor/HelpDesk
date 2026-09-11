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
            <tr className="border-b text-gray-500 last:border-b-0">
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
                    <p>
                        Deseja realmente exluir <strong>Philipi Pastor?</strong>
                    </p>
                    <p className="mt-4">
                        Ao excluir, todos os chamados deste cliente serão removidos e esta ação não poderá ser desfeita.
                    </p>
                    <div className="flex items-center justify-end gap-2">
                        <Button variant="color" onClick={() => setModalDel(false)}>Cancelar</Button>

                        <Button>Sim, excluir</Button>
                    </div>
                </Modal>
            }

            {modalEdit &&
                <Modal isOpen={modalEdit} title="CLiente" onClose={() => setModalEdit(false)}>
                    <form>
                        <Avatar name="teste"/>
                        <Input legenda="Nome" />
                        <Input legenda="E-mail" />
                        <Button>Salvar</Button>
                    </form>
                </Modal>
            }
        </>
    )
}