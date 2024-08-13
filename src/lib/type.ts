export enum Status {
  PENDING = "PENDING",
  WORKING = "WORKING",
  COMPLETED = "COMPLETED",
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  password?: string | null;
  session: Session[];
  verification?: UserVerification | null;
  todos: Todo[];
  oauthAccount?: OauthAccount | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  expiresAt: Date;
  user: User;
  userId: string;
}

export interface UserVerification {
  id: string;
  code: string;
  expiresAt: Date;
  user: User;
  userId: string;
  createdAt: Date;
}

export interface OauthAccount {
  id: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: Date | null;
  user: User;
  userId: string;
}

export interface Todo {
  id: string;
  task: string;
  status: Status;
  user: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
