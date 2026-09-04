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
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3546B3] text-xs uppercase text-gray-50">
            {initials}
        </div>
    )
}