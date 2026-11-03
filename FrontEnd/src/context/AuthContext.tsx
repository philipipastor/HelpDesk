import { createContext, useEffect, useState, type ReactNode } from "react";

import { api } from "../services/api";

import type { User } from "../types/User";

type AuthContextData = {
    user: User | null,
    signIn: (user: User) => void,
    signOut: () => void,
    updateUser: (user: User["user"]) => void
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

    function updateUser(updatedUser: User["user"]) {
        localStorage.setItem(`${LocalStorageKey}:user`, JSON.stringify(updatedUser))
        setUser(current => current && { ...current, user: updatedUser })
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

        // Token expirado ou inválido: volta para o login. O próprio login responde 401 para senha errada.
        const interceptor = api.interceptors.response.use(undefined, error => {
            if (error.response?.status === 401 && error.config?.url !== "/sessions") {
                signOut()
            }

            return Promise.reject(error)
        })

        return () => api.interceptors.response.eject(interceptor)
    }, [])

    return (
        <authContext.Provider value={{ user, signIn, signOut, updateUser }}>
            {children}
        </authContext.Provider>
    )
}
