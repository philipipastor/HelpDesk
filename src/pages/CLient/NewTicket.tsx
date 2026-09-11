import { Button } from "../../components/Button"
import { Input } from "../../components/Input"

export function NewTicket() {
    return (
        <main className="w-full px-8 py-10">

            <div className="mx-auto w-full max-w-5xl">

                <h1 className="mb-6 text-2xl font-semibold text-blue-900">
                    Novo chamado
                </h1>

                <div className="grid grid-cols-[1fr_320px] overflow-hidden rounded-xl border border-gray-500 bg-white">

                    <section className="border-r border-gray-500 p-8">

                        <h2 className="text-base font-semibold text-gray-900">
                            Informações
                        </h2>

                        <p className="mt-1 max-w-sm text-sm text-gray-400">
                            Configure os dias e horários em que você está disponível para atender chamados
                        </p>

                        <form className="mt-8 flex flex-col gap-6">

                            <Input
                                legenda="Título"
                                placeholder="Digite um título para o chamado"
                            />

                            <Input
                                legenda="Descrição"
                                placeholder="Descreva o que está acontecendo"
                            />

                            <div className="mt-10">
                                <label className="mb-2 block text-sm font-medium uppercase leading-1.75 text-gray-300">
                                    Categoria de serviço
                                </label>

                                <select
                                    defaultValue=""
                                    className="w-full border-b border-gray-500 bg-transparent py-2 text-sm text-gray-400 outline-none"
                                >
                                    <option value="" disabled>
                                        Selecione a categoria de atendimento
                                    </option>

                                    <option value="rede">
                                        Instalação de Rede
                                    </option>

                                    <option value="dados">
                                        Recuperação de Dados
                                    </option>

                                    <option value="hardware">
                                        Manutenção de Hardware
                                    </option>

                                    <option value="software">
                                        Suporte de Software
                                    </option>
                                </select>
                            </div>

                        </form>

                    </section>

                    <aside className="p-8">

                        <h2 className="text-base font-semibold text-gray-900">
                            Resumo
                        </h2>

                        <p className="mt-1 text-sm text-gray-300">
                            Valores e detalhes
                        </p>

                        <div className="mt-8">

                            <span className="text-xs text-gray-400">
                                Categoria de serviço
                            </span>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                                Erro de rede
                            </p>

                        </div>

                        <div className="mt-6">

                            <span className="text-xs text-gray-400">
                                Custo inicial
                            </span>

                            <p className="mt-1 text-xl font-semibold text-gray-900">
                                R$ 200,00
                            </p>

                        </div>

                        <p className="mt-8 text-sm leading-5 text-gray-300">
                            O chamado será automaticamente atribuído a um técnico disponível
                        </p>

                        <Button>
                            Criar chamado
                        </Button>

                    </aside>

                </div>

            </div>

        </main>
    )
}