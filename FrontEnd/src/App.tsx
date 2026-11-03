import { AuthProvider } from "./context/AuthContext"
import { Route } from "./routes"

export default function App() {

  return ( 
    <AuthProvider>
      <Route/>
    </AuthProvider>
  )
}

