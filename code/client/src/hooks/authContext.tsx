import { GoogleUser } from '@/models/googleUser';
import jwt_decode from 'jwt-decode';
import { User } from '@/models/user';
import React, { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean
  user?: User;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const token = localStorage.getItem('googleToken')
    if (token) {
      setIsAuthenticated(true)
      const user_object: GoogleUser = jwt_decode(token)
      setUser({ user_name: user_object.name, user_pic: user_object.picture, user_id: user_object.sub })
    } else {
      setIsAuthenticated(false)
      // navigate('/login')
    }
  }, [isAuthenticated]);

  const login = (userData: User) => {
    setIsAuthenticated(true)
    setUser(userData);
    console.log('user', user)
  };

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
