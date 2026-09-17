import { Link, useParams } from "react-router"
import { TechnicianForm } from "./components/Technicians/TechnicianForm"
import { getTechnician } from "./components/Technicians/technicianService"

export function TechnicianProfile() {
    const { id } = useParams()
    const technician = id ? getTechnician(id) : undefined

    if (id && !technician) {
        return (
            <section className="px-8 py-10">
                <h1 className="text-xl font-semibold text-blue-dark">Técnico não encontrado</h1>
                <Link to="/tecnicos" className="mt-4 inline-block text-sm text-blue-base">Voltar para técnicos</Link>
            </section>
        )
    }

    return <TechnicianForm key={id || "novo"} technician={technician} />
}
