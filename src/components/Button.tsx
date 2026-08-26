type Props = React.ComponentProps<"button"> & {
    children: string
}

export function Button({children, ...rest}: Props){
    return(
        <button className="mt-2 w-full rounded-xs bg-gray-200 py-1.5 text-sm font-medium leading-3 text-gray-600 transition-colors cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300 sm:py-2" type="button" {...rest}>{children}</button>
    )
}
