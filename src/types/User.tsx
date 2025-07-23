

export interface User {
  id?:string;
  name: string;
  role: string;
  email: string;
  password?: string;
  token?: string
  created_at?: string
}

export interface RecoverPassword {
  password: string;
  confirm_password:string;
  token: string;
  email:string;
}