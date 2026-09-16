import { Button } from "../../../../components/Button"
import { Modal } from "../../../../components/Modal"
import { Input } from "../../../../components/Input"

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
                    {service.title}
                </td>

                <td className="px-4 py-3 text-sm text-gray-200">
                    {formatCurrency(Number(service.amount))}
                </td>

                <td>
                    <span className={`rounded-full px-3 py-1 text-sm font-medium ${status
                        ? "bg-feedback-done/20 text-feedback-done"
                        : "bg-feedback-danger/20 text-feedback-danger"
                        }`}
                    >
                        {status ? "Ativo" : "Inativo"}
                    </span>
                </td>

                <td>
                    <Button className="flex items-center gap-1 text-xs font-bold text-gray-300 cursor-pointer hover:text-gray-100" onClick={() => setStatus(!status)}>
                        <img src={status ? iconBan : iconActivate} alt="ícone de ativar/desativar" />
                        {status ? "Desativar" : "Ativar"}
                    </Button>
                </td>

                <td className="px-4 py-3 flex items-center justify-end gap-2">
                    <Button variant="icon" onClick={() => setModal(true)}>
                        <img src={iconEdit} alt="ícone de editar" />
                    </Button>
                </td>
            </tr>

            {modal &&
                <Modal isOpen={modal} title="Serviço" onClose={() => setModal(false)}>
                    <form onSubmit={() => alert("editado")} className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
                        <Input legenda="Descrição" aria-label="Descrição" placeholder="Descrição do serviço" defaultValue={service.title} required pattern=".*\S.*" />
                        <Input legenda="Valor" aria-label="Valor em reais" type="number" min="0.01" step="0.01" placeholder="0,00" defaultValue={service.amount} required />
                        <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                            <Button type="submit" className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                                Salvar
                            </Button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    )
}