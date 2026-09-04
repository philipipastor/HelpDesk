import { Avatar } from "../../../../components/Avatar"
import { Button } from "../../../../components/Button"

import type { Client } from "../../../../types/Client"

import iconEdit from "../../../../assets/iconEdit.png"
import iconRemove from "../../../../assets/iconRemove.png"

type Props = {
    client: Client
}

export function ClientRow({ client }: Props) {
    return (
        <tr className="border-b text-gray-500 last:border-b-0">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <Avatar name={client.name} />

                    <span className="text-sm font-medium text-gray-700">
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
                    >
                        <img
                            src={iconRemove}
                            alt="ícone de remover"
                        />
                    </Button>

                    <Button
                        type="button"
                        variant="icon"
                    >
                        <img
                            src={iconEdit}
                            alt="ícone de editar"
                        />
                    </Button>
                </div>
            </td>
        </tr>
    )
}