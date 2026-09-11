import iconClosed from "../assets/x.png"

type Props = {
    isOpen: boolean,
    title: string,
    onClose: () => void,
    children: React.ReactNode
}

export function Modal({isOpen,title,onClose,children}: Props){

    if(!isOpen){
        return null
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white">
                
                <header className="flex items-center justify-between border-b border-gray-500 px-6 py-4">
                    <h2 className="font-semibold text-gray-200">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer"
                    >
                        <img src={iconClosed} alt="ícone de fechar"/>
                    </button>
                </header>

                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}