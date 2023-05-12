export interface User {
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
}
export interface UserResponse {
  user?: User;
  token: string;
  issued_at: number;
  expires_at: number;
}

export interface UsersListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserResponse[];
}

export interface UserStore {
  user: UserResponse["user"] | null;
  token: UserResponse["token"] | null;
  issuedAt: UserResponse["issued_at"] | null;
  expiresAt: UserResponse["expires_at"] | null;
  onlineUsers: UserResponse["user"][];
  // setOnlineUsers: any;
  setOnlineUsers: (onlineUsers: UserResponse["user"][]) => void;
  setUser: (user: UserResponse["user"]) => void;

  setToken: (token: UserResponse["token"]) => void;
  setIssuedAt: (issuedAt: UserResponse["issued_at"]) => void;
  setExpiresAt: (expiresAt: UserResponse["expires_at"]) => void;
  setUpdate: (update: boolean) => void;
  update: boolean;
}
