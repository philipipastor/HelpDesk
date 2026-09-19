import { CreateServiceModal } from "./components/Services/CreateServiceModal"
import { Button } from "../../components/Button"
import { ServicesTable } from "./components/Services/ServicesTable"

import { useState } from "react"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const serviceSchema = z.object({
    title: z.string().min(1,"Informe o nome do serviço"),
    amount: z.string().min(1,"Informe o valor do serviço")
})

type serviceData = z.infer<typeof serviceSchema>

export function Services() {
    const [modal, setModal] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<serviceData>({
        resolver: zodResolver(serviceSchema),
        defaultValues: {
            title: "",
            amount: ""
        }
    })

    function onSubmit(data: serviceData){
        console.log(data)
    }
    return (
        <>
            <main className="w-full px-8 py-10">
                <header className="mb-6 space-between flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-blue-dark">
                        Serviços
                    </h1>
                    <Button onClick={() => setModal(true)} variant="btnMedium"> + Novo </Button>
                </header>

                <ServicesTable />
            </main>
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