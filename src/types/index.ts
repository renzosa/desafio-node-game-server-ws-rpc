export interface User {
  password: string;
  name: string;
  credit: number;
  getData(): UserData;
}

export interface UserData {
  user: string;
  name: string;
  credit: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  data?: UserData;
}