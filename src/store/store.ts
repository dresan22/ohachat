import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserResponse {
  user: {
    uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_active: boolean;
    is_online: boolean;
    last_login: string;
    created_at: string;
    updated_at: string;
  };
  token: string;
  issued_at: number;
  expires_at: number;
}

interface UserStore {
  user: UserResponse["user"] | null;
  token: UserResponse["token"] | null;
  issuedAt: UserResponse["issued_at"] | null;
  expiresAt: UserResponse["expires_at"] | null;
  setUser: (user: UserResponse["user"]) => void;

  setToken: (token: UserResponse["token"]) => void;
  setIssuedAt: (issuedAt: UserResponse["issued_at"]) => void;
  setExpiresAt: (expiresAt: UserResponse["expires_at"]) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      issuedAt: null,
      expiresAt: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setIssuedAt: (issuedAt) => set({ issuedAt }),
      setExpiresAt: (expiresAt) => set({ expiresAt }),
    }),
    {
      name: "user-storage",
    }
  )
);
