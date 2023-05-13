import { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/client";
import useWebSocket from "react-use-websocket";
import { AxiosRequestConfig } from "axios";
import { useChatStore, useUserStore } from "../store/store";

export function ChatRoom() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const chatPartner = useChatStore((state) => state.chatPartner);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const token = useUserStore((state) => state.token);
  const [textMessage, setTextMessage] = useState<any[]>([]);
  const messages = useChatStore((state) => state.messages);
  const setMessages = useChatStore((state) => state.setMessages);

  const handleSendMessage = async () => {
    sendData();
  };

  const sendMessageParams: AxiosRequestConfig = {
    url: `/api/v1/users/${chatPartner?.uuid}/send-message/`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      content: textMessage,
    },
  };

  const { response, sendData, error } = useAxios(sendMessageParams);

  useEffect(() => {
    const messagesArray = [
      ...messages,
      { content: response?.data.content, sender: response?.data.sender },
    ];
    if (response?.status === 201) {
      setMessages([
        ...messages,
        { content: response.data.content, sender: response.data.sender },
      ]);
    }
  }, [response]);

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
            <nav className="ml-auto"></nav>
          </div>
        </section>

        <section className="h-full overflow-auto bg-gradient-to-b from-[#0078A7] p-2 text-black">
          {messages.map((message: any, i: any) => {
            return (
              <ChatBubble
                message={message}
                isSentByCurrentUser={message?.sender.uuid === user?.uuid}
                key={i}
                // isSentByCurrentUser={message?.sender === user?.uuid}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </section>
        <section>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
              setTextMessage([]);
            }}
            className="flex items-center justify-between border-t border-gray-300 p-4"
          >
            <input
              type="text"
              placeholder="Escribe un mensaje"
              className="mr-4 w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none"
              onChange={(e) => setTextMessage(e.target.value as any)}
              value={textMessage}
            />
            {/* <EmojiPicker /> */}
            <button
              type="submit"
              className="rounded-md bg-[#0078A7] px-4 py-2 text-sm font-medium text-white hover:bg-[#0ebbff] focus:outline-none focus:ring-2 focus:ring-[#0078A7] focus:ring-offset-2"
            >
              Enviar
            </button>
          </form>
        </section>
      </div>
    </>
  );
}
