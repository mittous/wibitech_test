export interface User {
  id: string;
  username: string;
  role: 'admin' | 'regular';
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterPayload) => Promise<{ success: boolean; data?: any; error?: any }>;
}

export interface RegisterPayload {
  fullName: string;
  username: string;
  password: string;
  role: "admin" | "user";
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
} 