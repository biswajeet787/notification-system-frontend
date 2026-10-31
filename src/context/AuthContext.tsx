
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { http } from '../api/client';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  whatsapp_phone: string;
  is_staff: boolean;
  is_superuser?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<AuthUser>;
  register: (
    username: string,
    email: string,
    password: string,
    whatsapp_phone: string
  ) => Promise<AuthUser>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check existing authentication when the application starts
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('auth_token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await http.get<AuthUser>('/auth/me/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('auth_token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  // Login
  const login = async (
    username: string,
    password: string
  ): Promise<AuthUser> => {
    const response = await http.post('/auth/login/', {
      username,
      password,
    });

    localStorage.setItem('auth_token', response.data.token);
    setUser(response.data.user);

    return response.data.user;
  };

  // Registration
  const register = async (
    username: string,
    email: string,
    password: string,
    whatsapp_phone: string
  ): Promise<AuthUser> => {
    const response = await http.post('/auth/register/', {
      username,
      email,
      password,
      whatsapp_phone,
    });

    localStorage.setItem('auth_token', response.data.token);
    setUser(response.data.user);

    return response.data.user;
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      await http.post('/auth/logout/');
    } finally {
      localStorage.removeItem('auth_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom authentication hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
