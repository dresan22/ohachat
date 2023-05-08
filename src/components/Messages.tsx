import EmojiPicker from "emoji-picker-react";
import { useUserStore } from "../store/store";

export function Messages() {
  const user = useUserStore((state) => state.user);

  console.log(user);

  return (
    <>
      <div className="flex w-full flex-col justify-between ">
        <section className="flex flex-col p-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            <div className="ml-3 flex flex-col">
              {user?.first_name}
              <span className="text-xs text-gray-500"> Online</span>
            </div>
          </div>
        </section>

        <section className="h-full bg-gradient-to-b from-[#0078A7]"></section>
        <section className="flex items-center justify-between border-t border-gray-300 p-4">
          <input
            type="text"
            placeholder="Escribe un mensaje"
            className="mr-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none"
          />
          {/* <EmojiPicker /> */}
          <button className="rounded-md bg-[#0078A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#0ebbff] focus:outline-none focus:ring-2 focus:ring-[#0078A7] focus:ring-offset-2">
            Enviar
          </button>
        </section>
      </div>
    </>
  );
}
