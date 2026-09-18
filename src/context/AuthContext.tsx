import { createContext, useState, type ReactNode } from "react";

import type { User } from "../types/User";

type AuthContextData = {
    user: User | null,
    signIn: (user: User) => void,
    signOut: () => void 
}

export const authContext = createContext<AuthContextData | undefined>(undefined)

export function AuthProvider({children}: {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(null)

    function signIn(authenticatedUser: User){
        setUser(authenticatedUser)
    }

    function signOut(){
        setUser(null)
    }

    return(
        <authContext.Provider value = {{ user, signIn, signOut }}>
            {children}
        </authContext.Provider>
    )
}