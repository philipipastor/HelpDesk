import { Outlet } from "react-router";
import logo from "../../assets/Logo_IconDark.png"

export function AuthLayout() {
  return (
    <main className="min-h-screen bg-blue-dark pt-6 md:bg-gray-600 md:pt-0">
      <div className="grid min-h-[calc(100dvh-1.5rem)] min-w-0 md:min-h-screen md:grid-cols-2">

        {/* Tela azul */}
        <section className="relative hidden overflow-hidden bg-blue-dark md:block">

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
              border-blue-dark
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
              border-blue-base
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
              border-blue-light
            "
          />

        </section>

        {/* Área do login */}
        <section
          className="
            flex
            min-w-0
            min-h-[calc(100dvh-1.5rem)]
            rounded-t-2xl
            md:min-h-screen
            md:rounded-none
            items-start
            justify-center
            bg-gray-600
            px-4
            py-8

            sm:items-center
            sm:py-10
          "
        >
          <div className="w-full min-w-0 max-w-100 wrap-anywhere">
            <div className="flex items-center justify-center mb-8">
                <img src={logo} alt="ícone de logo" className="w-15 h-15"/>
                <span className="pl-2 text-2xl text-blue-dark font-semibold">HelpDesk</span>
            </div>

            <Outlet />
          </div>
        </section>

      </div>
    </main>
  );
}
