import { useEffect, useRef, useState } from "react"

import { formatDate } from "../utils/FormatDate"

type Props = {
    id: string
    value: string
    onChange: (date: string) => void
}

const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

// O "hoje" segue o horário de Brasília, o mesmo que a API usa para recusar datas passadas.
const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "America/Sao_Paulo" }).format(new Date())

function toIsoDate(year: number, month: number, day: number) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
}

export function DatePicker({ id, value, onChange }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [visibleMonth, setVisibleMonth] = useState(() => {
        const [year, month] = (value || today).split("-").map(Number)
        return { year, month: month - 1 }
    })
    const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!isOpen) return

        function closeOnOutsideClick(event: MouseEvent) {
            if (!container.current?.contains(event.target as Node)) setIsOpen(false)
        }

        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setIsOpen(false)
        }

        document.addEventListener("mousedown", closeOnOutsideClick)
        document.addEventListener("keydown", closeOnEscape)

        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick)
            document.removeEventListener("keydown", closeOnEscape)
        }
    }, [isOpen])

    const { year, month } = visibleMonth
    const firstWeekDay = new Date(Date.UTC(year, month, 1)).getUTCDay()
    const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" })
        .format(new Date(Date.UTC(year, month, 1)))
    const isCurrentMonth = toIsoDate(year, month, 1) <= today.slice(0, 8) + "01"

    function changeMonth(step: number) {
        const next = new Date(Date.UTC(year, month + step, 1))
        setVisibleMonth({ year: next.getUTCFullYear(), month: next.getUTCMonth() })
    }

    return (
        <div ref={container} className="relative min-w-0">
            <button
                id={id}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(open => !open)}
                className={`flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 border-b bg-transparent py-2 text-left text-sm outline-none focus-visible:border-blue-base ${isOpen ? "border-blue-base" : "border-gray-500"} ${value ? "text-gray-100" : "text-gray-400"}`}
            >
                <span className="truncate">{value ? formatDate(value) : "Selecione"}</span>

                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 shrink-0 fill-none stroke-blue-base stroke-2">
                    <rect x="4" y="5" width="16" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M4 11h16" />
                </svg>
            </button>

            {isOpen && (
                // Abre para cima: o campo fica no fim do formulário, e assim o calendário não é cortado.
                <div role="dialog" aria-label="Escolher data" className="absolute bottom-full left-0 z-20 mb-2 w-68 rounded-md border border-gray-500 bg-gray-600 p-3 shadow-md">
                    <div className="mb-2 flex items-center justify-between">
                        <button type="button" aria-label="Mês anterior" disabled={isCurrentMonth} onClick={() => changeMonth(-1)} className="size-7 cursor-pointer rounded text-gray-200 hover:bg-gray-500 disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent">
                            ‹
                        </button>

                        <span aria-live="polite" className="inline-block text-sm font-semibold text-gray-200 first-letter:uppercase">{monthName}</span>

                        <button type="button" aria-label="Próximo mês" onClick={() => changeMonth(1)} className="size-7 cursor-pointer rounded text-gray-200 hover:bg-gray-500">
                            ›
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 text-center text-xs">
                        {weekDays.map((weekDay, index) => (
                            <span key={index} aria-hidden="true" className="py-1 text-gray-400">{weekDay}</span>
                        ))}

                        {firstWeekDay > 0 && <span style={{ gridColumn: `span ${firstWeekDay}` }} />}

                        {Array.from({ length: daysInMonth }, (_, index) => {
                            const day = index + 1
                            const date = toIsoDate(year, month, day)
                            const weekDay = (firstWeekDay + index) % 7
                            const isBlocked = date < today || weekDay === 0 || weekDay === 6

                            return (
                                <button
                                    key={date}
                                    type="button"
                                    disabled={isBlocked}
                                    aria-label={formatDate(date)}
                                    aria-pressed={date === value}
                                    onClick={() => {
                                        onChange(date)
                                        setIsOpen(false)
                                    }}
                                    className={`h-8 rounded ${date === value ? "bg-blue-dark font-semibold text-gray-600" : isBlocked ? "cursor-not-allowed text-gray-400 line-through" : "cursor-pointer text-gray-200 hover:bg-gray-500"}`}
                                >
                                    {day}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}
