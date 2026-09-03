import { Avatar } from "../../../../components/Avatar"
import type { Client } from "../../../../types/Client"

type Props = {
    client: Client
}

export function ClientRow({ client }: Props) {
    return (
        <tr>

            <td>
                <div className="flex items-center gap-2">
                    <Avatar name={client.name} />
                    <span> 
                        {client.name}
                    </span>
                </div>
            </td>

            <td>
                {client.email}
            </td>

            <td>
                <div className="flex items-center gap-2">
                    <button></button>
                    <button></button>
                </div>
            </td>

        </tr>
    )
}