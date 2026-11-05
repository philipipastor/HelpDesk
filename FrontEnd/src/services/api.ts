import axios from "axios"

export const api = axios.create({
    // Na Vercel, VITE_API_URL aponta para a API publicada no Render.
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3333"
})
