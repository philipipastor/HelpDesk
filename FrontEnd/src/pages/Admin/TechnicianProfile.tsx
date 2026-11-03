import { Link, useParams } from "react-router"
import { useEffect, useState } from "react"
import { TechnicianForm } from "./components/Technicians/TechnicianForm"
import { getTechnician } from "./components/Technicians/technicianService"
import type { Technician } from "../../types/technician"

export function TechnicianProfile() {
    const { id } = useParams()
    const [technician, setTechnician] = useState<Technician>()
    const [isLoading, setIsLoading] = useState(!!id)

    useEffect(() => {
        async function fetchTechnician(technicianId: string) {
            try {
                setTechnician(await getTechnician(technicianId))
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        if (id) {
            fetchTechnician(id)
        }
    }, [id])

    if (isLoading) {
        return <p className="px-4 py-6 text-sm text-gray-300 sm:px-6 lg:px-8 lg:py-10">Carregando...</p>
    }

    if (id && !technician) {
        return (
            <section className="px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <h1 className="text-xl font-semibold text-blue-dark">Técnico não encontrado</h1>
                <Link to="/tecnicos" className="mt-4 inline-block text-sm text-blue-base">Voltar para técnicos</Link>
            </section>
        )
    }

    return <TechnicianForm key={id || "novo"} technician={technician} />
}
