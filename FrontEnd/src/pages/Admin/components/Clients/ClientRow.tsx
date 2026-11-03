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
                    <div className="flex min-w-0 items-center gap-2 lg:gap-3 max-lg:[&>div]:size-7 max-lg:[&>div]:text-[10px]">
                        <Avatar name={client.name} />

                        <span className="text-sm font-medium text-gray-100 max-lg:truncate max-lg:text-xs" title={client.name}>
                            {client.name}
                        </span>
                    </div>
                </td>

                <td className="px-4 py-3 text-sm text-gray-200">
                    <span className="block max-lg:truncate" title={client.email}>{client.email}</span>
                </td>

                <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 lg:gap-2">
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
