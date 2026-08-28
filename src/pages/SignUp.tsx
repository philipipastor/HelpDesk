import { Input } from "../components/Input"
import { Button } from "../components/Button"

import { useState, type FormEvent } from "react"

import { useNavigate } from "react-router"

import { z, ZodError } from "zod"

const schema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

export function SignUp(){

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()

    function handleSubmit(e: FormEvent){
        e.preventDefault()

        const data = {
            name,
            email,
            password
        }

        try {
            const user = schema.parse(data)
            setError("")
            console.log(user)

        } catch (error) {
            console.log(error)

            if(error instanceof ZodError){
                setError(error.issues[0].message)
            }
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


                <form className="mt-4 space-y-2.5" onSubmit={handleSubmit}>
                    <Input legenda="Nome" placeholder="Digite o nome completo" onChange={(e) => setName(e.target.value)}/>
                    <Input legenda="E-mail" placeholder="exeplo@mail.com" onChange={(e) => setEmail(e.target.value)}/>
                    <Input legenda="Senha" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)}/>
                

                    <p className="text-red-600 ml-2 text-sm">{error}</p>

                    <Button type="submit">
                        Cadastrar
                    </Button>
                </form>   
            </div>

            <div className="rounded-md border border-gray-500 bg-gray-600 px-3 py-3 mt-2 sm:px-4 sm:py-4">
                <h3 className="text-base font-semibold">Já tem uma conta ?</h3>
                <p className="text-sm">Entre agora mesmo</p>
                <Button onClick={() => navigate("/")}>
                    Acessar conta
                </Button>
            </div>
        </div>
    )
}