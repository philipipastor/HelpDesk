import { Button } from "../../../../components/Button"
import type { Service } from "../../../../types/Services"
import { useState } from "react"

import iconEdit from "../../../../assets/iconEdit.png"
import iconBan from "../../../../assets/ban.png"
import iconActivate from "../../../../assets/circle-check.png"

type Props = {
    service: Service
}

export function ServicesRow({ service }: Props){
    const [status, setStatus] = useState<boolean>(service.status);

    return(
        <tr className="border-b border-gray-500 last:border-b-0">
            <td className=" px-4 py-3 text-sm font-medium text-gray-100">
                {service.title}
            </td>

            <td className="px-4 py-3 text-sm text-gray-200">
                {service.amount}
            </td>

            <td>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                        status
                            ? "bg-feedback-done/20 text-feedback-done"
                            : "bg-feedback-danger/20 text-feedback-danger"
                    }`}
                >
                    {status ? "Ativo" : "Inativo"}
                </span>
            </td>

            <td>
                <Button className="flex items-center gap-1 text-xs font-bold text-gray-300 cursor-pointer hover:text-gray-100" onClick={() => setStatus(!status)}>
                    <img src={status ? iconBan : iconActivate} alt="ícone de ativar/desativar"/>
                    {status ? "Desativar" : "Ativar"}
                </Button>
            </td>

            <td className="px-4 py-3 flex items-center justify-end gap-2">
                <Button variant="icon">
                    <img src={iconEdit} alt="ícone de editar"/>
                </Button>
            </td>
        </tr>
    )
}