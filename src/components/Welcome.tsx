import tech from "../assets/oha-tech.png";
import { useUserStore } from "../store/store";

export function Welcome() {
  const user = useUserStore((state) => state.user);
  return (
    <div className="flex w-full items-center justify-center space-x-8 ">
      <div className="grid h-[500px] w-[500px] place-content-center rounded-full bg-[#0078A7] bg-opacity-25">
        <img src={tech} alt="circle" className="ml-10" />
        <header className="text-center ">
          <h2 className="text-2xl font-bold">
            Bienvenido, {user?.first_name}!
          </h2>
          <p className="text-sm font-medium text-gray-400">Comienza un chat</p>
        </header>
      </div>
    </div>
  );
}
