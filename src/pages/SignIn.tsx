import { Input } from "../components/Input"
import { Button } from "../components/Button"

import { useState, type FormEvent } from "react"

import { useNavigate } from "react-router"

import { z } from "zod"

import { ZodError } from "zod"

const schema = z.object({
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

export function SignIn(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function handleSubmit(e: FormEvent){
        e.preventDefault()

        const data = {
            email,
            password
        }

        try {
            const user = schema.parse(data)
            console.log(user)
            
        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                setError(error.issues[0].message)
            }
        }
    }

    return(
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

                <form className="mt-4 space-y-2.5" onSubmit={handleSubmit}>
                    <Input legenda="E-mail" placeholder="exeplo@mail.com" onChange={(e) => setEmail(e.target.value)}/>
                    <Input legenda="Senha" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
                    <p className="text-red-600 ml-2 text-sm">{error}</p>

                    <Button type="submit">Entrar</Button>
                </form>

            </div>

            <div className="rounded-md border border-gray-500 bg-gray-600 px-3 py-3 mt-2 sm:px-4 sm:py-4">
                <h3 className="text-base font-semibold">
                    Ainda não tem uma conta ?
                </h3>

                <p className="text-sm">
                    Cadastre agora mesmo
                </p>

                <Button onClick={() => navigate("cadastro")}>Criar conta</Button>
            </div>
            
        </div>
    )
}