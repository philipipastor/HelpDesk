import { createContext, useEffect, useState, type ReactNode } from "react";

import { api } from "../services/api";

import type { User } from "../types/User";

type AuthContextData = {
    user: User | null,
    signIn: (user: User) => void,
    signOut: () => void
}

const LocalStorageKey = "@helpdesk"

export const authContext = createContext<AuthContextData | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    function signIn(authenticatedUser: User) {
        localStorage.setItem(`${LocalStorageKey}:user`, JSON.stringify(authenticatedUser.user))
        localStorage.setItem(`${LocalStorageKey}:token`, authenticatedUser.token)

        api.defaults.headers.common["Authorization"] = `Bearer ${authenticatedUser.token}`
        setUser(authenticatedUser)
    }

    function signOut() {
        localStorage.removeItem(`${LocalStorageKey}:user`)
        localStorage.removeItem(`${LocalStorageKey}:token`)

        delete api.defaults.headers.common["Authorization"]

        setUser(null)
    }

    function loadUser() {
        const user = localStorage.getItem(`${LocalStorageKey}:user`)
        const token = localStorage.getItem(`${LocalStorageKey}:token`)

        if(token && user){
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
            
            setUser({
                token,
                user:JSON.parse(user)
            })
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <authContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </authContext.Provider>
    )
}
