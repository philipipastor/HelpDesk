import { Table } from "../../../../components/Table"
import { ServicesRow} from "./ServicesRow"
import type { Service } from "../../../../types/Services"

const services: Service[] = [
    {
        id: "1",
        title: "instalação de rede",
        amount: 180,
        status: true,
    },
        {
        id: "2",
        title: "Recuperação de dados",
        amount: 1200,
        status: false
    }
]

export function ServicesTable(){
    return(
        <div className="overflow-hidden rounded-lg border border-gray-500"> 
            <Table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-500 text-left">
                        <th className="px-4 py-3 text-xs font-normal text-gray-400">
                            Título
                        </th>

                        <th className="px-4 py-3 text-xs font-normal text-gray-400">
                            Valor
                        </th>

                        <th className="px-4 py-3 text-xs font-normal text-gray-400">
                            Status
                        </th>

                        <th scope="col"><span className="sr-only">Ativar ou desativar</span></th>
                        <th scope="col" className="w-24"><span className="sr-only">Editar</span></th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service) => (
                        <ServicesRow
                            key={service.id}
                            service={service}
                        />
                    ))}
                </tbody>
            </Table>
        </div>

    )
}
