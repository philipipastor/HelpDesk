type Props = {
    active: boolean,
}

export function Status({ active }: Props) {
    return (
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${
                active
                    ? "bg-[#508b2649] text-[#268b33]"
                    : "bg-[#d03e3e54] text-[#D03E3E]"
            }`}
        >
            {active ? "Ativo" : "Inativo"}
        </span>
    )
}