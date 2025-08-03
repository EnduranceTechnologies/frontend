// src/contexts/UserContext.js
import { API } from '@/services/api/api';
import { User } from '@/types/User';
import { AxiosResponse } from 'axios';
import { createContext, useContext, ReactNode } from 'react';

interface UserContextInterface {
  user: User;
  updateUser: (data: User) => Promise<AxiosResponse>;
  createUser: (data: User) => Promise<AxiosResponse>;
  getUser: (id: string) => Promise<AxiosResponse>;
  deleteUser: (id: string) => Promise<AxiosResponse>;
  getUsers: () => Promise<AxiosResponse>;
  getAccount: () => Promise<AxiosResponse>;
  getRole: (id: string) => Promise<AxiosResponse>;
}

const UserContext = createContext<UserContextInterface | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {

  const user = {
    name: '',
    role: '',
    email: '',
  }

  async function getUser(id: string) {
    const response = await API.get(`/user/${id}`);
    return response;
  }

  async function getUsers() {
    const response = await API.get(`/user/`);
    return response;
  }

  async function getAccount() {
    const response = await API.get(`/user/account/`);
    return response;
  }

  async function createUser(data: User) {
    const response = await API.post('/user', data);
    return response;
  }

  async function updateUser(data: User) {
    const response = await API.put('/user/', data);
    return response;
  }

  async function deleteUser(id: string) {
    const response = await API.delete(`/user/${id}`);
    return response;
  }

  async function getRole(id: string) {
    const response = await API.get(`/user/role/${id}`);
    return response;
  }

  return (
    <UserContext.Provider value={{ user, createUser, getUser, updateUser, deleteUser, getUsers, getAccount, getRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an UserProvider');
  }
  return context;
};
