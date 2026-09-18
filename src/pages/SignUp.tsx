import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { api } from "../services/api"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useNavigate } from "react-router"

import { z } from "zod"
import { AxiosError } from "axios"

const schema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

type SignUpData = z.infer<typeof schema>

export function SignUp(){

    const [error, setError] = useState("")

    const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm<SignUpData>({
        resolver: zodResolver(schema)
    })

    const navigate = useNavigate()

    async function onSubmit(data: SignUpData){
        setError("")

        try {
            await api.post("/users", data)
            if(confirm("Cadastro concluído com sucesso, deseja seguir para a página de login?")){
                navigate("/")
            }

        } catch (error) {
            if(error instanceof AxiosError){
                setError(error.response?.data?.message || "Não foi possível cadastrar!")
                return
            }

            setError("Não foi possível cadastrar!")
        }
    }

    return (
        <div>
            <div className="rounded-md border border-gray-500 bg-gray-600 px-3 py-3 sm:px-4 sm:py-4">

                <div className="mb-14">
                    <h2 className="text-lg font-semibold leading-5 text-gray-200 sm:text-xl sm:leading-6">
                        Crie sua conta
                    </h2>
                    <p className="mt-1 text-sm leading-5 text-gray-300 sm:text-base sm:leading-6">
                        Informe seu nome, e-mail e senha
                    </p>
                </div>


                <form className="mt-4 space-y-2.5" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input
                        legenda="Nome"
                        placeholder="Digite o nome completo"
                        autoComplete="name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <p id="name-error" role="alert" className="text-feedback-danger text-sm">
                            {errors.name.message}
                        </p>
                    )}

                    <Input
                        legenda="E-mail"
                        type="email"
                        placeholder="exemplo@mail.com"
                        autoComplete="email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p id="email-error" role="alert" className="text-feedback-danger text-sm">
                            {errors.email.message}
                        </p>
                    )}

                    <Input
                        type="password"
                        legenda="Senha"
                        placeholder="Digite sua senha"
                        autoComplete="new-password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p id="password-error" role="alert" className="text-feedback-danger text-sm">
                            {errors.password.message}
                        </p>
                    )}

                    {error && (
                        <p role="alert" className="text-feedback-danger ml-2 text-sm flex justify-center items-center">{error}</p>
                    )}

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                </form>   
            </div>

            <div className="rounded-md border border-gray-500 bg-gray-600 px-3 py-3 mt-2 sm:px-4 sm:py-4">
                <h3 className="text-base font-semibold">Já tem uma conta ?</h3>
                <p className="text-sm">Entre agora mesmo</p>
                <Button variant="color" onClick={() => navigate("/")}>
                    Acessar conta
                </Button>
            </div>
        </div>
    )
}
