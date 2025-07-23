import {
  useState,
  createContext,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { RecoverPassword, User } from '../types/User';
import { api } from '../api/api';
import { AxiosResponse } from 'axios';
import { decryptData, encryptData } from '@/utils/encrypt';

interface AuthContextInterface {
  token: string;
  signIn: (user: User) => void;
  login: (email: string, password: string) => Promise<AxiosResponse>;
  forgotPassword: (email: string) => Promise<AxiosResponse>;
  recoverPassword: (data: RecoverPassword) => Promise<AxiosResponse>;
  signOut: () => void;
  verifySecret: (data: {
    email: string;
    secret: string;
  }) => Promise<AxiosResponse>;
  get2FaQrCode: (email: string) => Promise<AxiosResponse>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  api: typeof api;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

interface AuthProviderInterface {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    role: 'MEMBER',
  });

  useEffect(() => {
    console.log(user);
    const cookieUser = Cookies.get('shark_user');
    const cookieToken = Cookies.get('shark_token');
    if (cookieUser && cookieToken) {
      const parsedUser = decryptData(cookieUser);
      setUser(parsedUser);
      setToken(cookieToken); // supondo que o token está dentro de user
    }
  }, []);

  useEffect(() => {
    console.log(user)
  }, [user]);

  const signIn = async (user: User) => {
    setToken(user.token!);
    setUser(user);
    Cookies.set('shark_user', encryptData(user), { expires: 7 }); // persiste por 7 dias
    Cookies.set('shark_token', (user.token!), { expires: 7 }); // persiste por 7 dias
  };

  const signOut = () => {
    setToken('');
  };

  async function login(email: string, password: string) {
    const response = await api.post('/auth/', { email, password });
    return response;
  }

  async function forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password/', { email });
    return response;
  }

  async function recoverPassword(data: RecoverPassword) {
    const response = await api.post('/auth/recover-password/', data);
    return response;
  }

  async function get2FaQrCode(email: string) {
    const response = await api.get(`/auth/2fa/${email}`);
    return response;
  }
  async function verifySecret(data: { email: string; secret: string }) {
    const response = await api.post('/auth/2fa/verify', data);
    return response;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        signIn,
        login,
        signOut,
        user,
        setUser,
        api,
        get2FaQrCode,
        verifySecret,
        recoverPassword,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
