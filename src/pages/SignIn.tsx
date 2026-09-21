import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { api } from "../services/api"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useNavigate } from "react-router"

import { z } from "zod"

import { AxiosError } from "axios"

import { useAuth } from "../hook/useAuth"

const schema = z.object({
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

type SignInData = z.infer<typeof schema>

export function SignIn() {

    const [error, setError] = useState("")

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInData>({
        resolver: zodResolver(schema)
    })

    const navigate = useNavigate()
    const auth = useAuth()

    async function onSubmit(data: SignInData) {
        setError("")

        try {
            const response = await api.post("/sessions", data)
            auth.signIn(response.data)

        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data?.message || "Não foi possível fazer login")
                return
            }

            setError("Não foi possível fazer login")
        }
    }

    return (
        <div>
            <div className="rounded-md border border-gray-500 bg-gray-600 px-3 py-3 sm:px-4 sm:py-4">

                <div>
                    <h2 className="text-lg font-semibold leading-5 text-gray-200 sm:text-xl sm:leading-6">
                        Acesse o portal
                    </h2>

                    <p className="mt-1 text-sm leading-5 text-gray-300 sm:text-base sm:leading-6">
                        Entre usando seu e-mail e senha cadastrados
                    </p>
                </div>

                <form className="mt-4 space-y-2.5" onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        autoComplete="current-password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p id="password-error" role="alert" className="text-feedback-danger text-sm">
                            {errors.password.message}
                        </p>
                    )}

                    {error && (
                        <p role="alert" className="text-feedback-danger ml-2 text-sm flex items-center justify-center">{error}</p>
                    )}

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

            </div>

            <div className="rounded-md border border-gray-500 bg-gray-600 px-3 py-3 mt-2 sm:px-4 sm:py-4">
                <h3 className="text-base font-semibold">
                    Ainda não tem uma conta ?
                </h3>

                <p className="text-sm">
                    Cadastre agora mesmo
                </p>

                <Button variant="color" onClick={() => navigate("cadastro")}>Criar conta</Button>
            </div>

        </div>
    )
}
