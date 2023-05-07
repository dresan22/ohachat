import logo from "../assets/oha-icon.png";
import loginImage from "../assets/oha-login.png";
import { Footer } from "../components/Footers";

export function Login() {
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
            <h1 className="mt-2 text-4xl font-bold">Login</h1>
          </header>
          <form className="mt-3 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                  placeholder="Email"
                />

                <label htmlFor="password" className="sr-only">
                  Password
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
                <input
                  type="checkbox"
                  id="forgot_password"
                  name="forgot_password"
                  className="my-5"
                />
                <label
                  htmlFor="forgot_password"
                  className="ml-2 text-sm text-slate-800"
                >
                  Olvidaste tu contraseña?
                </label>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#0078A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#0ebbff] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  Iniciar sesión
                </button>
                <div className=" mt-4 flex items-center   ">
                  <p className="mt-2  text-sm text-slate-800">
                    No tienes una cuenta?
                    <a
                      href="#"
                      className="ml-2 font-medium text-[#0078A7] hover:text-[#0ebbff]"
                    >
                      Regístrate
                    </a>
                  </p>
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
