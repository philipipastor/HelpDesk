type Props = React.ComponentProps<"input"> & {
    legenda?: string
}

export function Input({ legenda, ...rest }: Props){
    return(
        <div>
            <fieldset className="group h-full w-full flex justify-center items-center mt-4">
                {legenda &&  
                    <legend className="block text-sm font-medium uppercase leading-1.75 text-gray-300 group-focus-within:text-blue-base">{legenda}</legend>
                }

                <input className="mt-2 mb-2 block w-full border-0 border-b border-gray-500 bg-transparent px-0 py-1 text-sm leading-3 text-gray-100 outline-none placeholder:text-gray-400 focus:border-blue-base focus:ring-0" type="text" {...rest}/>
            </fieldset>
        </div>
    )
}
