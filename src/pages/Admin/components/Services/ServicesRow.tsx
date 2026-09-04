import { Button } from "../../../../components/Button"
import type { Service } from "../../../../types/Services"
import iconEdit from "../../../../assets/iconEdit.png"

type Props = {
    service: Service
}

export function ServicesRow({ service }: Props){
    return(
        <tr>
            <td>
                {service.title}
            </td>

            <td>
                {service.amount}
            </td>

            <td>
                {service.status}
            </td>

            <td>
                ativar/desativar
            </td>

            <td>
                <Button variant="icon">
                    <img src={iconEdit} alt="ícone de editar"/>
                </Button>
            </td>
        </tr>
    )
}