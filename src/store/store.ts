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
      update: true,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setUpdate: (update) => set({ update }),
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
}

export const useChatStore = create<ChatStore>((set) => ({
  chatPartner: null,
  setChatPartner: (chatPartner) => set({ chatPartner }),
}));


