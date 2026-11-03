import type { UserRole } from "./UserRole"

export type User = {
    token: string,
    user: {
        id: string,
        name: string,
        email: string,
        role: UserRole
    }
}