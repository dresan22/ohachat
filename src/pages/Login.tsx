import { useEffect, useState } from "react";
import logo from "../assets/oha-icon.png";
import loginImage from "../assets/oha-login.png";
import { Footer } from "../components/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/store";
import useAxios from "../utils/client";
import { AxiosRequestConfig } from "axios";
import { useToasts } from "react-toast-notifications";

export function Login() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const [errors, setErrors] = useState<any>(undefined);

  const [email, setEmail] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const axiosParams: AxiosRequestConfig = {
    url: "/api/v1/token/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      email: email,
      password: password,
    }),
  };

  const { response, sendData, error } = useAxios(axiosParams);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email !== undefined && password !== undefined) {
      try {
        const response = await sendData();
      } catch (err) {
        addToast("Error al iniciar sesión", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  useEffect(() => {
    if (error !== undefined) {
      setErrors(error?.response?.data);
      addToast(`${error?.response?.data?.non_field_errors[0].message}`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [error]);

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
        <div className="relative my-4  grid place-content-center text-slate-800">
          <div className="absolute left-9 top-9  hidden md:block">
            <img src={logo} alt="logo" className="w-20" />
          </div>
          <header>
            <h2 className="text-2xl font-bold">
              Bienvenido a <span className="text-[#7FBCE9]">Oha App</span>
            </h2>
            <h1 className="mt-2 text-4xl font-bold">Login</h1>
          </header>
          <form className="mt-3 space-y-6">
            <div className="-space-y-px rounded-md ">
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  onChange={(e) => setPassword(e.target.value)}
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
                  // disabled={email === undefined || password === undefined}
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#0078A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#0ebbff] focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  onClick={(e) => handleClick(e)}
                >
                  Iniciar sesión
                </button>
                <div className=" mt-4 flex items-center   ">
                  <p className="mt-2  text-sm text-slate-800">
                    No tienes una cuenta?
                    <Link
                      to="/register"
                      className="ml-2 font-medium text-[#0078A7] hover:text-[#0ebbff]"
                    >
                      Regístrate
                    </Link>
                  </p>
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
