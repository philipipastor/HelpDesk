import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../../../../components/Button"
import { Input } from "../../../../components/Input"
import { Avatar } from "../../../../components/Avatar"
import type { Technician } from "../../../../types/technician"
import { availableHours, technicianFormSchema, type TechnicianFormData } from "./technicianFormSchema"
import { createTechnician, updateTechnician } from "./technicianService"
import iconBack from "../../../../assets/arrow-left.png"

type Props = { technician?: Technician }

export function TechnicianForm({ technician }: Props) {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<TechnicianFormData>({
        resolver: zodResolver(technicianFormSchema),
        defaultValues: {
            name: technician?.name || "",
            email: technician?.email || "",
            password: "",
            availability: technician?.availability || [],
            isNew: !technician,
        },
    })
    const selectedHours = watch("availability")
    const previousHours = technician?.availability.filter(hour => !availableHours.includes(hour)) || []

    function toggleHour(hour: string) {
        const hours = selectedHours.includes(hour)
            ? selectedHours.filter(item => item !== hour)
            : [...selectedHours, hour].sort()
        setValue("availability", hours, { shouldValidate: true, shouldDirty: true })
    }

    async function onSubmit(data: TechnicianFormData) {
        setError("")
        const values = { name: data.name, email: data.email, availability: data.availability }
        try {
            if (technician) {
                await updateTechnician(technician.id, values)
            } else {
                await createTechnician({ ...values, password: data.password })
            }
            navigate("/tecnicos")
        } catch {
            setError("Não foi possível salvar o técnico. Tente novamente.")
        }
    }

    return (
        <section className="w-full px-6 py-8 md:px-8 md:py-10">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto w-full max-w-200">
                <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <button type="button" onClick={() => navigate("/tecnicos")} className="mb-1 flex items-center gap-1 text-sm font-semibold text-gray-300 hover:text-blue-base cursor-pointer">
                            <img src={iconBack} alt="" className="size-4" />Voltar
                        </button>
                        <h1 className="text-xl font-semibold text-blue-dark md:text-2xl">
                            {technician ? "Editar técnico" : "Novo técnico"}
                        </h1>
                    </div>
                    <div className="flex gap-2">
                        <Button disabled={isSubmitting} onClick={() => navigate("/tecnicos")} className="h-10 rounded-[5px] bg-gray-500 px-4 text-sm font-bold text-gray-100 hover:bg-gray-400 disabled:opacity-50 cursor-pointer">Cancelar</Button>
                        <Button type="submit" disabled={isSubmitting} className="h-10 rounded-[5px] bg-gray-200 px-4 text-sm font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50 cursor-pointer">
                            {isSubmitting ? "Salvando..." : technician ? "Salvar alterações" : "Cadastrar técnico"}
                        </Button>
                    </div>
                </header>
                {error && <p role="alert" className="mb-4 text-sm text-feedback-danger">{error}</p>}

                <div className="grid items-start gap-6 lg:grid-cols-[296px_minmax(0,1fr)]">
                    <section className="rounded-[10px] border border-gray-500 p-6">
                        <h2 className="text-base font-semibold text-gray-200">Dados pessoais</h2>
                        <p className="mt-1 mb-6 text-xs text-gray-300">Defina as informações do perfil de técnico</p>

                        {technician && <Avatar name={technician.name} />}
                        <Input legenda="Nome" aria-label="Nome" placeholder="Nome completo" autoComplete="name" {...register("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                        {errors.name && <p id="name-error" role="alert" className="text-xs text-feedback-danger">{errors.name.message}</p>}

                        <Input legenda="E-mail" aria-label="E-mail" placeholder="exemplo@mail.com" type="email" autoComplete="email" {...register("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                        {errors.email && <p id="email-error" role="alert" className="text-xs text-feedback-danger">{errors.email.message}</p>}

                        {!technician && <>
                            <Input legenda="Senha" aria-label="Senha" placeholder="Defina a senha de acesso" type="password" autoComplete="new-password" {...register("password")} aria-invalid={!!errors.password} aria-describedby="password-help" />
                            <p id="password-help" className={`text-xs ${errors.password ? "text-feedback-danger" : "text-gray-400"}`}>{errors.password?.message || "Mínimo de 6 dígitos"}</p>
                        </>}
                    </section>

                    <section className="rounded-[10px] border border-gray-500 p-6">
                        <h2 className="text-base font-semibold text-gray-200">Horários de atendimento</h2>
                        <p className="mt-1 mb-6 text-xs text-gray-300">Selecione os horários de disponibilidade do técnico para atendimento</p>

                        <div className="space-y-4">
                            {[{ title: "Manhã", hours: availableHours.slice(0, 4) }, { title: "Tarde", hours: availableHours.slice(4) }].map(period => (
                                <fieldset key={period.title}>
                                    <legend className="mb-2 text-xs font-bold uppercase text-gray-300">{period.title}</legend>
                                    <div className="flex flex-wrap gap-2">
                                        {period.hours.map(hour => (
                                            <button key={hour} type="button" aria-pressed={selectedHours.includes(hour)} onClick={() => toggleHour(hour)} className={`h-7 rounded-full border px-3 text-xs font-semibold cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-base ${selectedHours.includes(hour) ? "border-blue-base bg-blue-base text-gray-600" : "border-gray-500 text-gray-200 hover:border-blue-base hover:bg-blue-base hover:text-gray-600"}`}>
                                                {hour}
                                            </button>
                                        ))}
                                    </div>
                                </fieldset>
                            ))}
                        </div>
                        
                        {previousHours.length > 0 && <div className="mt-4 text-xs text-gray-300">
                            <p>Horários antigos fora do padrão atual serão preservados. Clique para removê-los:</p>
                            {previousHours.filter(hour => selectedHours.includes(hour)).map(hour => (
                                <button key={hour} type="button" onClick={() => toggleHour(hour)} aria-label={`Remover horário antigo ${hour}`} className="mt-2 mr-2 rounded-full border border-blue-base bg-blue-base px-3 py-1 text-gray-600">{hour} ×</button>
                            ))}
                        </div>}
                        {errors.availability && <p role="alert" className="mt-3 text-xs text-feedback-danger">{errors.availability.message}</p>}
                    </section>
                </div>
            </form>
        </section>
    )
}
