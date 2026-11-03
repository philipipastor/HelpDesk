import { classMerge } from "../utils/ClassMerge"

type Props = React.ComponentProps<"button"> & {
    variant?: "default" | "icon" | "btnMedium" | "color"
}

const variants = {
    button: {
        default: "w-full h-10",
        icon: "w-7.5 h-7.5 bg-gray-500 hover:bg-gray-400",
        btnMedium: "w-24 h-10",
        color: "bg-gray-500 text-gray-100 hover:bg-gray-400"
    }
}


export function Button({children, type="button", variant = "default", ...rest}: Props){
    return(
        <button className={classMerge([" flex min-w-0 shrink-0 items-center justify-center mt-6 w-full h-10 rounded-md bg-gray-200 py-1.5 text-sm font-medium leading-3 text-gray-600 transition-colors cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:py-2", variants.button[variant]])} type={type} {...rest}>{children}</button>
    )
}
