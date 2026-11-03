type Props = React.ComponentProps<"table">

export function Table({ children, ...props }: Props) {
    return (
        <table {...props}>
            {children}
        </table>
    )
}