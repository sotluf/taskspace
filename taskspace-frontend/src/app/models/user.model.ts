export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface RegisterRequest {
    name: string;
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}
