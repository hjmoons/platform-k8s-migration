import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 초기 로드 시 토큰 확인
    const token = localStorage.getItem('jwt');
    if (token) {
      // TODO: 토큰 검증 및 사용자 정보 가져오기
      setUser({ token });
    }
    setIsLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('jwt', token);
    setUser({ token });
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
