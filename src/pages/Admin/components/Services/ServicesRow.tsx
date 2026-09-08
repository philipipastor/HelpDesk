import { Button } from "../../../../components/Button"
import { Status } from "../../../../components/Status"
import type { Service } from "../../../../types/Services"
import { useState } from "react"

import iconEdit from "../../../../assets/iconEdit.png"
import iconBan from "../../../../assets/ban.png"
import iconActivate from "../../../../assets/circle-check.png"

type Props = {
    service: Service
}

export function ServicesRow({ service }: Props){
    const [status, setStatus] = useState<boolean>(true);

    return(
        <tr className="border-b text-gray-500 last:border-b-0">
            <td className=" px-4 py-3 text-sm font-medium text-gray-100">
                {service.title}
            </td>

            <td className="px-4 py-3 text-sm text-gray-200">
                {service.amount}
            </td>

            <td>
                <Status active={status}/>
            </td>

            <td>
                <Button className="flex items-center gap-1 text-xs font-bold text-gray-300 cursor-pointer hover:text-inherit" onClick={() => setStatus(!status)}>
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