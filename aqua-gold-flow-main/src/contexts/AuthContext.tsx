import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginRequest, AuthContextType } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API untuk demo - ganti dengan API Laravel asli
const mockLogin = async (credentials: LoginRequest): Promise<{ user: User; token: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock users untuk demo
  const mockUsers = {
    'admin@water.com': { id: '1', name: 'Admin Water', email: 'admin@water.com', role: 'admin' as const, created_at: '2024-01-01' },
    'operator@water.com': { id: '2', name: 'Operator Water', email: 'operator@water.com', role: 'operator' as const, created_at: '2024-01-01' },
    'kasir@water.com': { id: '3', name: 'Kasir Water', email: 'kasir@water.com', role: 'kasir' as const, created_at: '2024-01-01' },
  };
  
  const user = mockUsers[credentials.email as keyof typeof mockUsers];
  
  if (!user || credentials.password !== 'password123') {
    throw new Error('Email atau password salah');
  }
  
  return {
    user,
    token: `mock-token-${user.id}-${Date.now()}`
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for stored auth data on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('water_billing_token');
    const storedUser = localStorage.getItem('water_billing_user');
    
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('water_billing_token');
        localStorage.removeItem('water_billing_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      const { user, token } = await mockLogin(credentials);
      
      setUser(user);
      setToken(token);
      
      // Store in localStorage
      localStorage.setItem('water_billing_token', token);
      localStorage.setItem('water_billing_user', JSON.stringify(user));
      
      toast({
        title: "Login Berhasil",
        description: `Selamat datang, ${user.name}!`,
      });
    } catch (error) {
      toast({
        title: "Login Gagal",
        description: error instanceof Error ? error.message : "Terjadi kesalahan",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('water_billing_token');
    localStorage.removeItem('water_billing_user');
    
    toast({
      title: "Logout Berhasil",
      description: "Anda telah berhasil keluar",
    });
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};