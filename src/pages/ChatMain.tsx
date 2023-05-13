import { useNavigate } from "react-router-dom";
import { ProfileChatCard } from "../components/ProfileChatCard";
import { ChatRoom } from "../components/ChatRoom";
import { Welcome } from "../components/Welcome";
import { useChatStore, useUserStore } from "../store/store";
import { useEffect } from "react";
import useAxios from "../utils/client";
import { AxiosRequestConfig } from "axios";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { BACKEND_WS_BASE, DATA_TYPES } from "../utils/contants";
import { useToasts } from "react-toast-notifications";

export default function Chat() {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const chatPartner = useChatStore((state) => state.chatPartner);
  const token = useUserStore((state) => state.token);
  const onlineUsers = useUserStore((state) => state.onlineUsers);
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);

  useWebSocket(
    `${BACKEND_WS_BASE}/ws/v1/users/${user?.uuid}/notifications/?token=${token}`,
    {
      onOpen: (event) => console.log(event),
      shouldReconnect: () => true,
      onMessage: (event) => {
        const { type, data } = JSON.parse(event.data);
        if (type === DATA_TYPES.USER_PRESENCE) {
          if (data.is_online) {
            setOnlineUsers(response?.data.results);

            addToast(`${data.first_name} is online`, {
              appearance: "success",
              autoDismiss: true,
            });
          }
          if (!data.is_online) {
            setOnlineUsers(response?.data.results);
            addToast(`${data.first_name} is offline`, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        }
        if (type === DATA_TYPES.NEW_MESSAGE) {
          if (messages.find((message: any) => message.content === data.content))
            return;
          setMessages([
            ...messages,
            { content: data.content, sender: data.sender },
          ]);
        }
      },
      onError: (event) => console.log(event),
    }
  );

  useEffect(() => {
    if (user === undefined || user === null) {
      navigate("/");
    }
  }, [user]);

  const allUsersParams: AxiosRequestConfig = {
    url: "/api/v1/users/?is_online=true",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const { response } = useAxios(allUsersParams);

  useEffect(() => {
    if (response !== undefined) {
      setOnlineUsers(response?.data.results);
    }
  }, [response, setOnlineUsers]);

  return (
    <div className="n grid h-screen place-content-center bg-oha-pattern bg-cover bg-center text-[#0078A7]">
      {user?.first_name}
      <div className="flex h-[80vh] min-w-[80vw] overflow-hidden rounded-2xl bg-white shadow-lg">
        <div className=" hidden w-1/3 flex-col rounded-2xl bg-[#F2F2F2] sm:block">
          <div className="ml-5 mt-5 flex items-center">
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
            <div className="ml-2 text-xl font-bold">Nuevo Chat</div>
          </div>
          {/* chats */}
          <div className="flex flex-1 p-2">
            <section className="flex-1 divide-y overflow-x-auto overflow-y-auto rounded-md bg-white p-4 shadow-inner">
              <header className="">
                <h2 className="text-md mb-3 font-bold underline underline-offset-4">
                  En linea
                </h2>
              </header>
              {/* online user */}
              {!!onlineUsers &&
                onlineUsers?.map((user: any, i: number) => (
                  <ProfileChatCard key={i} user={user} />
                ))}
            </section>
          </div>
        </div>
        {chatPartner === null && <Welcome />}
        {chatPartner !== null && <ChatRoom />}
      </div>
      <button
        onClick={() => {
          setUser(undefined);
          setToken(undefined as any);
          navigate("/");
        }}
        className="absolute bottom-5 right-5"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
      </button>
    </div>
  );
}
