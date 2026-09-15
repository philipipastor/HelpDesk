import iconProgress from "../assets/clock-2.png"
import iconHelp from "../assets/circle-help.png"
import iconCheck from "../assets/circle-check-big.png"
import type { StatusType } from "../types/Status"

type Props = {
    status: StatusType
}

const statusStyles = {
    open: {
        label: "Aberto",
        className: "bg-feedback-open/20 text-feedback-open",
        icon: iconHelp
    },

    in_progress: {
        label: "Em atendimento",
        className: "bg-feedback-progress/20 text-feedback-progress",
        icon: iconProgress
    },

    closed: {
        label: "Encerrado",
        className: "bg-feedback-done/20 text-feedback-done",
        icon: iconCheck
    },
}

export function Status({ status }: Props) {
    const currentStatus = statusStyles[status]

    return (
        <span
            className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${currentStatus.className}`}
        >
            <img
                src={currentStatus.icon}
                alt="ícone de status"
            />

            {currentStatus.label}
        </span>
    )
}