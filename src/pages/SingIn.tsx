import { Input } from "../components/Input"
import { Button } from "../components/Button"

import { useNavigate } from "react-router"

export function SingIn(){
    const navigate = useNavigate()

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

                <form className="mt-4 space-y-2.5">
                    <Input legenda="E-mail" placeholder="exemplo@mail.com"/>
                    <Input legenda="Senha" placeholder="Digite sua senha"/>
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