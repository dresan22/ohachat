import { useChatStore, useUserStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import ChatBubble from "./ChatBubble";

import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { set } from "react-hook-form";
import useAxios from "../utils/client";
import { AxiosRequestConfig } from "axios";

export function ChatRoom() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const chatPartner = useChatStore((state) => state.chatPartner);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const onlineUsers = useUserStore((state) => state.onlineUsers);
  const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
  const token = useUserStore((state) => state.token);
  const [messages, setMessages] = useState<any[]>([]);
  const [messageHistory, setMessageHistory] = useState([]);

  const BACKEND_WS_BASE = "wss://api.chat.oha.services";

  useWebSocket(
    `${BACKEND_WS_BASE}/ws/v1/users/${user?.uuid}/notifications/?token=${token}`,
    {
      onOpen: () => {
        console.log("opened");
      },
      shouldReconnect: (closeEvent) => true,
      onMessage: (event) => {
        const data = JSON.parse(event.data);
        if (data.type === "user-presence") {
          // setOnlineUsers(response?.data.results);
        } else if (data.type === "message") {
          console.log("loggin message");
        }
      },
      onError: (event) => console.log(event),
    }
  );

  function handleSendMessage() {
    // sendMessage(messages as any);
    setMessages([]);
  }

  return (
    <>
      <div className="flex w-full flex-col justify-between ">
        <section className="flex flex-col p-4">
          <div className=" flex items-center">
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
              {chatPartner?.first_name} {chatPartner?.last_name}
              <span className="text-xs text-gray-500"> Online</span>
            </div>
            <nav className="ml-auto">
              <button
                onClick={() => {
                  setUser(undefined);
                  navigate("/");
                }}
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
            </nav>
          </div>
        </section>

        <section className="h-full overflow-auto bg-gradient-to-b from-[#0078A7] p-2 text-black">
          {messageHistory.map((message, i) => (
            <ChatBubble
              text={message}
              isSentByCurrentUser
              key={i}
              // isSentByCurrentUser={message?.sender === user?.uuid}
            />
          ))}
          <div ref={messagesEndRef} />
        </section>
        <section className="flex items-center justify-between border-t border-gray-300 p-4">
          <input
            type="text"
            placeholder="Escribe un mensaje"
            className="mr-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none"
            onChange={(e) => setMessages(e.target.value as any)}
          />
          {/* <EmojiPicker /> */}
          <button
            className="rounded-md bg-[#0078A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#0ebbff] focus:outline-none focus:ring-2 focus:ring-[#0078A7] focus:ring-offset-2"
            onClick={handleSendMessage}
          >
            Enviar
          </button>
        </section>
      </div>
    </>
  );
}
