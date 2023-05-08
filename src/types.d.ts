export interface UserResponse {
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
