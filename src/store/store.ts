import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserStore } from "../types/users";

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      issuedAt: null,
      expiresAt: null,
      onlineUsers: [],
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIssuedAt: (issuedAt) => set({ issuedAt }),
      setExpiresAt: (expiresAt) => set({ expiresAt }),
      setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
    }),
    {
      name: "user-storage",
    }
  )
);

interface ChatStore {
  chatPartner: UserStore["user"] | null;
  setChatPartner: (chatPartner: UserStore["user"]) => void;
  chats: any[];
  setChats: (chats: any[]) => void;
  messages: any[];
  setMessages: (messages: any[]) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
  chatPartner: null,
  setChatPartner: (chatPartner) => set({ chatPartner }),
  chats: [],
  setChats: (chats) => set({ chats }),
}));


