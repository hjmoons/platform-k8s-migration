import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return {
      username: decoded.preferred_username || decoded.sub || 'Unknown',
      email: decoded.email || '',
      name: decoded.name || decoded.preferred_username || 'User',
      roles: decoded.realm_access?.roles || [],
    };
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 로드 시 토큰 확인
    const token = localStorage.getItem('jwt');
    if (token) {
      const userInfo = decodeToken(token);
      if (userInfo) {
        setUser({ token, ...userInfo });
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('jwt', token);
    const userInfo = decodeToken(token);
    if (userInfo) {
      setUser({ token, ...userInfo });
    }
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
