import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  return accessToken ? <>{children}</> : null;
};

export default RequireAuth;
