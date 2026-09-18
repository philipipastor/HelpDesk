import { Button } from "../../components/Button"
import { ServicesTable } from "./components/Services/ServicesTable"
import { Modal } from "../../components/Modal"
import { Input } from "../../components/Input"

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
                <Modal isOpen={modal} title="Cadastro de serviço" onClose={() => setModal(false)}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 [&_fieldset]:mt-0 [&_input]:mb-0 [&_input]:h-8">
                        <Input legenda="Título" placeholder="Nome do serviço" {...register("title")}/>
                        {errors.title && <p id="title-error" role="alert" className="text-xs text-feedback-danger">{errors.title.message}</p>}

                        <Input legenda="Valor" placeholder="R$ 0,00" {...register("amount")}/>
                        {errors.amount && <p id="title-error" role="alert" className="text-xs text-feedback-danger">{errors.amount.message}</p>}

                        <div className="-mx-6 border-t border-gray-500 px-6 pt-6">
                            <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex h-10 w-full items-center justify-center rounded-[5px] bg-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-100 cursor-pointer">
                                {isSubmitting ? "Salvando" : "Salvar"}
                            </Button>
                        </div>
                    </form>
                </Modal>
            }
        </>
    )
}