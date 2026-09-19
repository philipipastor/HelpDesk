import { ChangePasswordModal } from "./Sidebar/ChangePasswordModal"
import { ProfileModal } from "./Sidebar/ProfileModal"
import { NavLink } from "react-router"
import { useEffect, useRef, useState } from "react"

import { Avatar } from "./Avatar"

import { Menus } from "../utils/Menus"

import { Technicians } from "../data/Technician"

import logo from "../assets/Logo_IconDark.png"
import iconUser from "../assets/circle-user.png"
import iconLogout from "../assets/log-out.png"
import { useAuth } from "../hook/useAuth"


export function Sidebar() {
    const { user } = useAuth()
    const auth = useAuth()

    const role = user?.user.role

    const [menuOpen, setMenuOpen] = useState(false)
    const [modal, setModal] = useState(false)
    const [modalPassword, setModalPassword] = useState(false)
    const footerRef = useRef<HTMLDivElement>(null)
    const userButtonRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        if (!menuOpen) return

        function handleClickOutside(event: PointerEvent) {
            if (event.target instanceof Node && !footerRef.current?.contains(event.target)) {
                setMenuOpen(false)
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setMenuOpen(false)
                userButtonRef.current?.focus()
            }
        }

        document.addEventListener("pointerdown", handleClickOutside)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [menuOpen])

    const technician = Technicians.find(technician => user?.user.id === technician.id)

    return (
        <aside className="flex min-h-screen w-64 flex-col justify-between bg-gray-100 text-gray-600">

            <div>
                <div className="flex items-center gap-3 px-5 py-6">
                    <img
                        src={logo}
                        alt="ícone de logo"
                        className="h-10 w-10"
                    />

                    <div>
                        <h1 className="text-lg font-semibold leading-5">
                            HelpDesk
                        </h1>

                        <p className="text-[10px] font-semibold uppercase text-blue-light">
                            {role}
                        </p>
                    </div>
                </div>

                {role && (
                    <nav className="mt-5 flex flex-col gap-2 px-3">
                        {Menus[role].map((menu) => (
                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                className={({ isActive }) =>
                                    `flex h-11 items-center gap-3 rounded-md px-3
                                    text-sm transition-colors
                                    ${isActive
                                        ? "bg-blue-dark text-gray-600"
                                        : "text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                                    }`
                                }
                            >
                                <img
                                    src={menu.icon}
                                    alt=""
                                    className="h-5 w-5"
                                />

                                <span>
                                    {menu.label}
                                </span>
                            </NavLink>
                        ))}
                    </nav>
                )}
            </div>

            <div ref={footerRef} className="relative border-t border-gray-200 px-4 py-5">
                <button
                    ref={userButtonRef}
                    type="button"
                    className="flex w-full items-center gap-3 text-left cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-light"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Avatar name={user?.user.name ?? "Usuário"} />

                    <div className="min-w-0">
                        <p className="text-xs text-gray-600">
                            {user?.user.name}
                        </p>

                        <p className="truncate text-[10px] text-gray-500">
                            {user?.user.email}
                        </p>
                    </div>
                </button>

                {menuOpen && (
                    <div className="absolute bottom-1 left-full z-50 ml-2 w-56 rounded-lg bg-gray-100 p-3 shadow-lg">
                        <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-gray-300">
                            Opções
                        </p>

                        <button
                            onClick={() => setModal(true)}
                            type="button"
                            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-gray-400 cursor-pointer hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-light"
                        >
                            <img src={iconUser} alt="" className="size-4" />
                            Perfil
                        </button>

                        <button
                            onClick={() => auth.signOut()}
                            type="button"
                            className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-feedback-danger cursor-pointer hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-light"
                        >
                            <img src={iconLogout} alt="" className="size-4" />
                            Sair
                        </button>
                    </div>
                )}

            </div>
            {modal && (
                <ProfileModal
                    modal={modal}
                    setModal={setModal}
                    setModalPassword={setModalPassword}
                    user={user}
                    role={role}
                    technician={technician}
                />
            )}

            {modalPassword && (
                <ChangePasswordModal
                    modalPassword={modalPassword}
                    setModalPassword={setModalPassword}
                    setModal={setModal}
                />
            )}

        </aside>
    )
}
