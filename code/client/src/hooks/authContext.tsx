import { GoogleUser } from '@/models/googleUser';
import jwt_decode from 'jwt-decode';
import { User } from '@/models/user';
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  user?: User;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: {
    user_id: '',
    user_name: '',
    user_pic: '',
  },
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC = ({ children }) => {
  const cookies = new Cookies();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const checkToken = async () => {
      const token = cookies.get('accessToken');
      console.log('token', token);

      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/login/auto-login', {
            headers: {
              Authorization: token,
            },
          });
          console.log('response', response);
          // if (response.data) {
          //   const user_object: GoogleUser = jwt_decode(token);
          //   setIsAuthenticated(true);
          //   setUser({
          //     user_name: user_object.name,
          //     user_pic: user_object.picture,
          //     user_id: user_object.sub,
          //   });
          // } else {
          //   // Token invalid, force log out and navigate to login page
          //   console.log('verify token failed');
          // }
        } catch (error) {
          console.error('Error verifying token:', error);
        }
      } else {
        setIsAuthenticated(false);
        // navigate('/login')
      }
    };

    checkToken();
  }, []);

  const login = (userData: User) => {
    setIsAuthenticated(true);
    console.log('userData', userData);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    cookies.remove('accessToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
