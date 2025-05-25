export interface AppUser {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface UserContextType {
  users: AppUser[];
} 