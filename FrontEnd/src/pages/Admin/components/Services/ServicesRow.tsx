import { EditServiceModal } from "./EditServiceModal"
import { Button } from "../../../../components/Button"

import type { Service } from "../../../../types/Services"

import { formatCurrency } from "../../../../utils/FormatCurrency"

import { useState } from "react"

import iconEdit from "../../../../assets/iconEdit.png"
import iconBan from "../../../../assets/ban.png"
import iconActivate from "../../../../assets/circle-check.png"

type Props = {
    service: Service
}

export function ServicesRow({ service }: Props) {
    const [status, setStatus] = useState<boolean>(service.status);
    const [modal, setModal] = useState<boolean>(false)

    return (
        <>
            <tr className="border-b border-gray-500 last:border-b-0">
                <td className=" px-4 py-3 text-sm font-medium text-gray-100">
                    <span className="block max-lg:truncate" title={service.title}>{service.title}</span>
                </td>

                <td className="px-4 py-3 text-sm text-gray-200">
                    {formatCurrency(service.amount)}
                </td>

                <td>
                    <span className={`inline-flex size-7 items-center justify-center rounded-full text-sm font-medium lg:inline lg:size-auto lg:px-3 lg:py-1 ${status
                        ? "bg-feedback-done/20 text-feedback-done"
                        : "bg-feedback-danger/20 text-feedback-danger"
                        }`}
                    >
                        <img src={status ? iconActivate : iconBan} alt="" className="size-4 lg:hidden" />
                        <span className="sr-only lg:not-sr-only">{status ? "Ativo" : "Inativo"}</span>
                    </span>
                </td>

                <td>
                    <Button className="flex min-h-7 min-w-4 items-center justify-center gap-1 text-xs font-bold text-gray-300 cursor-pointer hover:text-gray-100 lg:min-h-0 lg:min-w-0 lg:justify-start" onClick={() => setStatus(!status)}>
                        <img src={status ? iconBan : iconActivate} alt="ícone de ativar/desativar" />
                        <span className="sr-only lg:not-sr-only">{status ? "Desativar" : "Ativar"}</span>
                    </Button>
                </td>

                <td className="px-4 py-3 lg:flex lg:items-center lg:justify-end lg:gap-2">
                    <Button variant="icon" onClick={() => setModal(true)}>
                        <img src={iconEdit} alt="ícone de editar" />
                    </Button>
                </td>
            </tr>

            {modal &&
                <EditServiceModal modal={modal} setModal={setModal} service={service} />
            }
        </>
    )
}
