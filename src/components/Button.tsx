import { classMerge } from "../utils/ClassMerge"

type Props = React.ComponentProps<"button"> & {
    variant?: "default" | "icon"
}

const variants = {
    button: {
        default: "w-full h-10 bg-gray-200",
        icon: "w-7 h-7 bg-gray-500 hover:bg-gray-400"
    }
}


export function Button({children, type="button", variant = "default", ...rest}: Props){
    return(
        <button className={classMerge([" flex items-center justify-center mt-2 w-full h-10 rounded-xs bg-gray-200 py-1.5 text-sm font-medium leading-3 text-gray-600 transition-colors cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:py-2", variants.button[variant]])} type={type} {...rest}>{children}</button>
    )
}
