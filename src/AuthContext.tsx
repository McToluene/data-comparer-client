import React, { createContext, useState, useContext } from 'react';

export type Company = {
  id: number;
  name: string;
  users: number;
  products: number;
  percentage: number;
  imageURL: string;
};

interface AuthContextData {
  user: any;
  company: Company;
  isAuthenticated: boolean;
  companyInfo: (data: Company) => void;
  companiesInfo: (data: Company[]) => void;
  hasCompany: boolean;
  companies: Company[];
  login: (data: any) => void;
  logout: () => void;
  error: string;
  updateError: (data: string) => void;
}

const AuthContext = createContext<AuthContextData>({
  user: { role: '' },
  company: { id: 0, name: '', users: 0, products: 0, percentage: 0, imageURL: '' },
  isAuthenticated: false,
  companyInfo: (data: Company) => {},
  companiesInfo: (data: Company[]) => {},
  hasCompany: false,
  companies: [],
  login: (data: any) => {},
  logout: () => {},
  error: '',
  updateError: (data: string) => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState({ role: '' });
  const [error, setError] = useState('');
  const [company, setCompany] = useState({
    id: 0,
    name: '',
    users: 0,
    products: 0,
    percentage: 0,
    imageURL: '',
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [hasCompany, setHasCompany] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const companyInfo = (company: Company) => {
    setCompany(company);
    setHasCompany(true);
  };

  const companiesInfo = (companies: Company[]) => {
    setCompanies(companies);
  };

  const logout = () => {
    setUser({ role: '' });
    setIsAuthenticated(false);
    setCompany({ id: 0, name: '', users: 0, products: 0, percentage: 0, imageURL: '' });
    setHasCompany(false);
  };

  const updateError = (message: string) => {
    setError(message);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        company,
        isAuthenticated,
        companyInfo,
        hasCompany,
        companies,
        companiesInfo,
        login,
        logout,
        error,
        updateError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
