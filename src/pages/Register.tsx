import { Footer } from "../components/Footers";
import logo from "./../assets/oha-icon.png";
import loginImage from "./../assets/oha-login.png";

export default function Register() {
  return (
    <div className="grid h-screen place-content-center bg-slate-500">
      <div className=" overflow-hidde grid h-[80vh]  max-w-[80vw] grid-cols-2 rounded-2xl bg-slate-50">
        <div className="relative grid  place-content-center text-slate-800">
          <div className="absolute left-9 top-9">
            <img src={logo} alt="logo" className="w-20" />
          </div>
          <header>
            <h2 className="text-2xl font-bold">
              Bienvenido a <span className="text-[#7FBCE9]">Oha App</span>
            </h2>
            <h1 className="mt-2 text-4xl font-bold">Registrate</h1>
          </header>
          <form className="mt-3 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Nombre Completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                  placeholder="Nombre Completo"
                />
                <label htmlFor="email-address" className="sr-only">
                  Correo Electrónico
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative mt-2  block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                  placeholder="Correo Electrónico"
                />

                <label htmlFor="password" className="sr-only">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative mt-2 block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                  placeholder="Contraseña"
                />
                <label htmlFor="password" className="sr-only">
                  Confirmar Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative mt-2 block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                  placeholder="Confirmar Contraseña"
                />
                <button
                  type="submit"
                  className="group relative mt-4 flex w-full justify-center rounded-md border border-transparent bg-[#0078A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#0ebbff] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Registrarse
                </button>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-sm">
                    <span>¿Ya tienes una cuenta?</span>
                    <a
                      href="#"
                      className="ml-1 font-medium text-slate-600 hover:text-slate-500"
                    >
                      Inicia Sesión
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <Footer />
        </div>
        <div className="">
          <img src={loginImage} alt="login" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}
