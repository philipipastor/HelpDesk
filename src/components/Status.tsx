type Props = {
    status: "open" | "in_progress" | "closed"
}

const statusStyles = {
    open: {
        label: "Aberto",
        className: "bg-red-100 text-red-500",
    },

    in_progress: {
        label: "Em atendimento",
        className: "bg-blue-100 text-blue-600",
    },

    closed: {
        label: "Encerrado",
        className: "bg-green-100 text-green-600",
    },
}

export function Status({ status }: Props) {
    const currentStatus = statusStyles[status]

    return (
        <span
            className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${currentStatus.className}`}
        >
            {currentStatus.label}
        </span>
    )
}