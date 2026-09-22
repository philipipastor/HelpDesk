import iconClosed from "../assets/x.png"
import { createPortal } from "react-dom"

type Props = {
    isOpen: boolean,
    title: React.ReactNode,
    onClose: () => void,
    children: React.ReactNode
}

export function Modal({isOpen,title,onClose,children}: Props){

    if(!isOpen){
        return null
    }

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="flex max-h-[calc(100dvh-2rem)] w-full min-w-0 max-w-md flex-col rounded-lg bg-gray-600 wrap-anywhere">
                
                <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-500 px-6 py-4">
                    <h2 className="min-w-0 font-semibold text-gray-200">
                        {title}
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 cursor-pointer"
                    >
                        <img src={iconClosed} alt="ícone de fechar"/>
                    </button>
                </header>

                <div className="min-h-0 overflow-y-auto overscroll-contain p-6">
                    {children}
                </div>
            </div>
        </div>,
        
        document.body
    )
    
}
