import { classMerge } from "../utils/ClassMerge"

type Props = {
    name: string,
    variant?: "primary" | "secondary"
}

const variants = {
    Avatar: {
        primary: "h-9 w-9",
        secondary: "h-7 w-7"
    }
}

export function Avatar({ name, variant = "primary" }: Props) {
    const initials = name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)

    return (
        <div className={classMerge(["flex items-center justify-center rounded-full bg-blue-dark text-xs uppercase text-gray-600"], variants.Avatar[variant])}>
            {initials}
        </div>
    )
}