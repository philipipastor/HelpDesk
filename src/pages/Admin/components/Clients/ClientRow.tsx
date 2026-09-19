import { EditClientModal } from "./EditClientModal"
import { DeleteClientModal } from "./DeleteClientModal"
import { Avatar } from "../../../../components/Avatar"
import { Button } from "../../../../components/Button"

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
                <DeleteClientModal modalDel={modalDel} setModalDel={setModalDel} client={client} />
            }

            {modalEdit &&
                <EditClientModal modalEdit={modalEdit} setModalEdit={setModalEdit} client={client} />
            }
        </>
    )
}
