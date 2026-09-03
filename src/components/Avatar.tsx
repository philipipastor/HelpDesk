type Props = {
    name: string
}

export function Avatar({ name }: Props) {
    const initials = name
        .split(" ")
        .map((name) => name[0])
        .join("")
        .slice(0, 2)

    return (
        <div>
            {initials}
        </div>
    )
}