import { Table } from "../../../../components/Table"
import { ServicesRow} from "./ServicesRow"

const services = [
    {
        id: "1",
        title: "instalação de rede",
        amount: "180",
        status: true,
    },
        {
        id: "2",
        title: "Recuperação de daos",
        amount: "1200",
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

                        <th className="w-24"></th>
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