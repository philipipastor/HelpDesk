import { CreateServiceModal } from "./components/Services/CreateServiceModal"
import { Button } from "../../components/Button"
import { ServicesTable } from "./components/Services/ServicesTable"

import { api } from "../../services/api"

import type { Service } from "../../types/Services"

import { useState } from "react"

import { serviceSchema, type ServiceFormData } from "./components/Services/serviceFormSchema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"

export function Services() {

    const [modal, setModal] = useState<boolean>(false)
    const [refreshCount, setRefreshCount] = useState(0)

    const { register, handleSubmit, setError, reset, formState: { errors, isSubmitting } } = useForm<ServiceFormData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: "",
            amount: ""
        }
    })

    async function onSubmit(data: ServiceFormData) {
        try {
            await api.post<Service>("/services", {
                title: data.title,
                amount: Number(data.amount.replace(",", ".")),
                status: true
            })
            setModal(false)
            reset()
            setRefreshCount(count => count + 1)

        } catch (error) {
            const message = error instanceof AxiosError
                ? error.response?.data?.message || "Não foi possível cadastrar o serviço"
                : "Ocorreu um erro inesperado"
            setError("root.server", {
                type: "server",
                message
            })
        }
    }
    return (
        <>
        <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <header className="mb-6 flex flex-wrap items-center justify-between gap-3 [&>button]:mt-0 max-lg:[&>button]:size-9">
                    <h1 className="text-xl font-semibold text-blue-dark">
                        Serviços
                    </h1>
                    <Button onClick={() => setModal(true)} variant="btnMedium"> +<span className="sr-only lg:not-sr-only"> Novo</span> </Button>
                </header>

                <ServicesTable refreshCount={refreshCount} />
            </div>
            {modal &&
                <CreateServiceModal
                    modal={modal}
                    setModal={setModal}
                    register={register}
                    errors={errors}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit(onSubmit)}
                />
            }
        </>
    )
}
