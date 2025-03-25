export interface AuthResponse {
  status: boolean;
  token: string;
  user: User;
  message: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}
