import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
  user: { role: '' },
  company: { name: '', users: 0, products: 0, percentage: 0 },
  isAuthenticated: false,
  companyInfo: (data: any) => {},
  hasCompany: false,
  login: (data: any) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({ role: '' });
  const [company, setCompany] = useState({ name: '', users: 0, products: 0, percentage: 0 });
  const [hasCompany, setHasCompany] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const companyInfo = (company: any) => {
    setCompany(company);
    setHasCompany(true);
  };

  const logout = () => {
    setUser({ role: '' });
    setIsAuthenticated(false);
    setCompany({ name: '', users: 0, products: 0, percentage: 0 });
    setHasCompany(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, company, isAuthenticated, companyInfo, hasCompany, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
