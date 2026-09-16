const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short"
})

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
})

export function formatDate(value?: string | null) {
    if (!value) return "Não informado"

    const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value)

    const date = new Date(isDateOnly ? `${value}T00:00:00` : value)

    if (Number.isNaN(date.getTime())) return "Não informado"

    return (isDateOnly ? dateFormatter : dateTimeFormatter).format(date)
}
