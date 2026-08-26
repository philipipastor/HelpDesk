import { Input } from "../components/Input"
import { Button } from "../components/Button"

import { useNavigate } from "react-router"

export function SingUp(){

    const navigate = useNavigate()
    return (
        <div>
            <div className="rounded-md border border-gray-500 bg-gray-600 px-3 py-3 sm:px-4 sm:py-4">

                <div className="mb-14">
                    <h2 className="text-lg font-semibold leading-5 text-gray-200 sm:text-xl sm:leading-6">Crie sua conta</h2>
                    <p className="mt-1 text-sm leading-5 text-gray-300 sm:text-base sm:leading-6">Informe seu nome, e-mail e senha</p>
                </div>


                <form className="mt-4 space-y-2.5">
                    <Input legenda="Nome" placeholder="Digite o nome completo"/>
                    <Input legenda="E-mail" placeholder="exeplo@mail.com"/>
                    <Input legenda="Senha" placeholder="Digite sua senha"/>
                </form> 

                <Button type="submit">Cadastrar</Button>
            </div>

            <div className="rounded-md border border-gray-500 bg-gray-600 px-3 py-3 mt-2 sm:px-4 sm:py-4">
                <h3 className="text-base font-semibold">Já tem uma conta ?</h3>
                <p className="text-sm">Entre agora mesmo</p>
                <Button onClick={() => navigate("/")}>Acessar conta</Button>
            </div>
        </div>
    )
}