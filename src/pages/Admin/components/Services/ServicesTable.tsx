import { Table } from "../../../../components/Table"
import { ServicesRow} from "./ServicesRow"

const services = [
    {
        id: "1",
        title: "instalação de rede",
        amount: "180",
        status: "Ativo",
    },
        {
        id: "2",
        title: "Recuperação de daos",
        amount: "1200",
        status: "Desativado"
    }
]

export function ServicesTable(){
    return(
        <Table>
            <thead>
                <tr>
                    <th>
                        Título
                    </th>

                    <th>
                        Valor
                    </th>

                    <th>
                        Status
                    </th>
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

    )
}