export enum UserRole {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface LoginInput {
  email: string;
  password: string;
}
