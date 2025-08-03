import {
  useState,
  createContext,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import { RecoverPassword, User } from '../types/User';
import { API } from '../services/api/api';
import { AxiosResponse } from 'axios';
import { decryptData, encryptData } from '@/services/utils/encrypt';
import { toast } from 'react-toastify';

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
  signWorkspace: (workspace_id: string) => Promise<void>;
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  headers: {
    headers: {
      workspace_id: string;
    };
  };
  API: typeof API;
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

interface AuthProviderInterface {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [token, setToken] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [user, setUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    role: 'MEMBER',
  });

  useEffect(() => {
    const cookieUser = Cookies.get('clinic_user');
    const cookieToken = Cookies.get('clinic_token') as string;
    const cookieWorkspace = Cookies.get('clinic_workspace_id') as string;
    if (cookieUser && cookieToken) {
      const parsedUser: User = decryptData(cookieUser);
      setUser(parsedUser);
      setToken(cookieToken); // supondo que o token está dentro de user
      setWorkspaceId(cookieWorkspace); // supondo que o token está dentro de user
    }
  }, []);

  const signIn = async (user: User) => {
    setToken(user.token!);
    setUser(user);
    Cookies.set('clinic_user', encryptData(user), { expires: 7 }); // persiste por 7 dias
    Cookies.set('clinic_token', user.token!, { expires: 7 }); // persiste por 7 dias
  };

  const signOut = () => {
    try {

      Cookies.remove('clinic_token'); // persiste por 7 dias
      Cookies.remove('clinic_user'); // persiste por 7 dias
      Cookies.remove('clinic_workspace_id'); // persiste por 7 dias
      setToken('');
      setWorkspaceId('');
      setUser({
        id: '',
        name: '',
        email: '',
        role: 'MEMBER',
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error('Erro ao fazer logout');
      }
    }
  };

  const headers = {
    headers: {
      "workspace_id": workspaceId,
    },
  }

  async function signWorkspace(workspace_id: string) {
    setWorkspaceId(workspace_id);
    Cookies.set('clinic_workspace_id', workspace_id, { expires: 7 }); // persiste por 7 dias
  }

  async function login(email: string, password: string) {
    const response = await API.post('/auth/', { email, password });
    return response;
  }

  async function forgotPassword(email: string) {
    const response = await API.post('/auth/forgot-password/', { email });
    return response;
  }

  async function recoverPassword(data: RecoverPassword) {
    const response = await API.post('/auth/recover-password/', data);
    return response;
  }

  async function get2FaQrCode(email: string) {
    const response = await API.get(`/auth/2fa/${email}`);
    return response;
  }

  async function verifySecret(data: { email: string; secret: string }) {
    const response = await API.post('/auth/2fa/verify', data);
    return response;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        headers,
        signIn,
        login,
        signOut,
        user,
        setUser,
        API,
        get2FaQrCode,
        verifySecret,
        recoverPassword,
        forgotPassword,
        signWorkspace,
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
