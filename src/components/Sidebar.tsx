import { NavLink } from "react-router"

import { Menus } from "../utils/Menus"
import { Avatar } from "./Avatar"

import logo from "../assets/Logo_IconDark.png"

type Props = {
    role?: "admin" | "client" | "technician"
}

export function Sidebar({ role }: Props) {
    return (
        <aside className="flex min-h-screen w-64 flex-col justify-between bg-[#17181C] text-white">
            
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

                        <p className="text-[10px] font-semibold uppercase text-[#8090FF]">
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
                                    ${
                                        isActive
                                            ? "bg-[#2E3DA3] text-white"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
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

            <div className="border-t border-white/5 px-4 py-5">
                <div className="flex items-center gap-3">
                    <Avatar name="Usuário ADM"/>

                    <div className="min-w-0">
                        <p className="text-xs text-white">
                            Usuário Adm
                        </p>

                        <p className="truncate text-[10px] text-gray-500">
                            user.admin@test.com
                        </p>
                    </div>
                </div>
            </div>

        </aside>
    )
}