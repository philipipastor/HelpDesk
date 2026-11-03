import { ChangePasswordModal } from "./Sidebar/ChangePasswordModal"
import { ProfileModal } from "./Sidebar/ProfileModal"
import { NavLink, useNavigate } from "react-router"
import { useEffect, useRef, useState } from "react"

import { Avatar } from "./Avatar"

import { Menus } from "../utils/Menus"

import { Technicians } from "../data/Technician"

import logo from "../assets/Logo_IconDark.png"
import iconUser from "../assets/circle-user.png"
import iconLogout from "../assets/log-out.png"
import iconMenu from "../assets/menu.png"
import { useAuth } from "../hook/useAuth"


export function Sidebar() {
    const { user } = useAuth()
    const auth = useAuth()
    const navigate = useNavigate()

    const role = user?.user.role

    const [menuOpen, setMenuOpen] = useState(false)
    const [navigationOpen, setNavigationOpen] = useState(false)
    const navigationButtonRef = useRef<HTMLButtonElement>(null)
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
        <aside className="relative z-40 flex w-full shrink-0 flex-col justify-between bg-gray-100 text-gray-600 lg:z-auto lg:min-h-screen lg:w-64"
            onKeyDown={event => {
                if (event.key === "Escape" && navigationOpen) {
                    setNavigationOpen(false)
                    navigationButtonRef.current?.focus()
                }
            }}
        >

            <div>
                <div className="flex min-h-20 items-center gap-3 py-4 pl-4 pr-20 sm:pl-6 lg:px-5 lg:py-6">
                    <button
                        ref={navigationButtonRef}
                        type="button"
                        aria-label={navigationOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={navigationOpen}
                        aria-controls="sidebar-navigation"
                        onClick={() => setNavigationOpen(open => !open)}
                        className="flex size-9 shrink-0 items-center justify-center rounded-md bg-gray-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-blue-light lg:hidden"
                    >
                        <img src={iconMenu} alt="" className="size-4" />
                    </button>
                    <img
                        src={logo}
                        alt="ícone de logo"
                        className="size-8 shrink-0 lg:size-10"
                    />

                    <div>
                        <h1 className="text-base font-semibold leading-5 lg:text-lg">
                            HelpDesk
                        </h1>

                        <p className="text-[10px] font-semibold uppercase text-blue-light">
                            {role}
                        </p>
                    </div>
                </div>

                {navigationOpen && (
                    <button type="button" aria-label="Fechar navegação" onClick={() => setNavigationOpen(false)}
                        className="fixed inset-x-0 bottom-0 top-20 bg-black/50 lg:hidden" />
                )}
                {role && (
                    <nav id="sidebar-navigation" className={`${navigationOpen ? "flex" : "hidden"} absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] flex-col gap-2 overflow-y-auto bg-gray-100 px-3 py-4 shadow-lg lg:static lg:mt-5 lg:flex lg:max-h-none lg:overflow-visible lg:py-0 lg:shadow-none`}>
                        {Menus[role].map((menu) => (
                            <NavLink
                                key={menu.path}
                                to={menu.path}
                                onClick={() => setNavigationOpen(false)}
                                className={({ isActive }) =>
                                    `flex min-h-11 items-center gap-2 rounded-md px-3 lg:gap-3
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
                                    className="h-5 w-5 shrink-0"
                                />

                                <span>
                                    {menu.label}
                                </span>
                            </NavLink>
                        ))}
                    </nav>
                )}
            </div>

            <div ref={footerRef} className="absolute right-4 top-5 sm:right-6 lg:relative lg:right-auto lg:top-auto lg:border-t lg:border-gray-200 lg:px-4 lg:py-5">
                <button
                    ref={userButtonRef}
                    type="button"
                    className="flex w-full items-center gap-3 text-left cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-light"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Avatar name={user?.user.name ?? "Usuário"} />

                    <div className="sr-only lg:not-sr-only lg:min-w-0">
                        <p className="text-xs text-gray-600 wrap-anywhere">
                            {user?.user.name}
                        </p>

                        <p className="truncate text-[10px] text-gray-500">
                            {user?.user.email}
                        </p>
                    </div>
                </button>

                {menuOpen && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-56 max-w-[calc(100vw-2rem)] rounded-lg bg-gray-100 p-3 shadow-lg lg:bottom-1 lg:left-full lg:right-auto lg:top-auto lg:ml-2 lg:mt-0">
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
                            onClick={() => {
                                auth.signOut()
                                navigate("/", { replace: true })
                            }}
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
