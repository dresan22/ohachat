import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";
import logo from "./../assets/oha-icon.png";
import loginImage from "./../assets/oha-login.png";
import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/store";
import { UserResponse } from "../types";
import useAxios from "../utils/client";
import { useToasts } from "react-toast-notifications";

export default function Register() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);

  const axiosParams: AxiosRequestConfig = {
    url: "/api/v1/token/?create=true",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
    }),
  };

  const { response, sendData } = useAxios(axiosParams);

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await sendData();
    } catch (err) {
      addToast("Error al crear cuenta", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {
    if (response !== undefined) {
      setUser(response.data.user);
      setToken(response.data.token);
      navigate("/chat");
    }
  }, [response]);

  return (
    <div className="grid h-screen place-content-center bg-slate-500">
      <div className=" grid grid-cols-1 overflow-hidden rounded-2xl  bg-slate-50  shadow-lg md:grid-cols-2 lg:h-[80vh] lg:max-w-[80vw]">
        <div className="relative my-4  grid place-content-center  text-slate-800 ">
          <div className="absolute left-9 top-9 hidden md:block">
            <img src={logo} alt="logo" className="w-20" />
          </div>
          <header>
            <h2 className="text-2xl font-bold">
              Bienvenido a <span className="text-[#7FBCE9]">Oha App</span>
            </h2>
            <h1 className="mt-2 text-4xl font-bold">Registrate</h1>
          </header>
          <form className="mt-3 space-y-6">
            <div className="-space-y-px rounded-md ">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nombre
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="name"
                  autoComplete="first_name"
                  required
                  className="relative block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                  placeholder="Nombre"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="name" className="sr-only">
                  Apellido
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="name"
                  autoComplete="last_name"
                  required
                  className="relative mt-2 block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-500 focus:z-10 focus:border-slate-500 focus:outline-none focus:ring-slate-500 sm:text-sm"
                  placeholder="Apellido"
                  onChange={(e) => setLastName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <label htmlFor="password" className="sr-only">
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
                /> */}
                <button
                  type="submit"
                  className="group relative mt-4 flex w-full justify-center rounded-md border border-transparent bg-[#0078A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#0ebbff] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  onClick={(e) => handleClick(e)}
                >
                  Registrarse
                </button>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">
                    <span>¿Ya tienes una cuenta?</span>
                    <Link
                      to="/"
                      className="ml-1 font-medium text-slate-600 hover:text-slate-500"
                    >
                      Inicia Sesión
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <Footer />
        </div>
        <div className="  overflow-hidden rounded-2xl ">
          <img
            src={loginImage}
            alt="oha-login"
            className=" h-[40vh] w-screen object-cover object-center sm:w-[80vw] md:h-full lg:h-full   lg:w-full	
          "
          />
        </div>
      </div>
    </div>
  );
}
