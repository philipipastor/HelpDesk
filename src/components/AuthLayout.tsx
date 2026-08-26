import { Outlet } from "react-router";
import logo from "../assets/Logo_IconDark.png"

export function AuthLayout() {
  return (
    <main className="min-h-screen bg-gray-600">
      <div className="grid min-h-screen md:grid-cols-2">

        {/* Tela azul */}
        <section className="relative hidden overflow-hidden bg-[#2E3DA3] md:block">

          {/* Curva mais escura */}
          <div
            className="
              absolute
              left-[-55%]
              top-[-15%]
              h-[140%]
              w-[120%]
              rounded-full
              border-70
              border-[#2E3DA3]
            "
          />

          {/* Curva intermediária */}
          <div
            className="
              absolute
              left-[-65%]
              top-[-5%]
              h-[125%]
              w-[110%]
              rounded-full
              border-60
              border-[#5165E1]
            "
          />

          {/* Curva clara */}
          <div
            className="
              absolute
              left-[-78%]
              top-[5%]
              h-[110%]
              w-full
              rounded-full
              border-55
              border-[#8996EB]
            "
          />

        </section>

        {/* Área do login */}
        <section
          className="
            flex
            min-h-screen
            items-start
            justify-center
            bg-gray-600
            px-4
            py-8

            sm:items-center
            sm:py-10
          "
        >
          <div className="w-full max-w-100">
            <div className="flex items-center justify-center mb-8">
                <img src={logo} alt="ícone de logo" className="w-15 h-15"/>
                <span className="pl-2 text-2xl text-[#2E3DA3] font-semibold">HelpDesk</span>
            </div>

            <Outlet />
          </div>
        </section>

      </div>
    </main>
  );
}