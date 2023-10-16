import React, { useEffect, useState } from 'react';
declare var google: any;
import jwt_decode from 'jwt-decode';
import { GSI_CLIENT_ID } from './config';
import { LoginView } from './view';

interface User {
  picture?: string;
  name?: string;
  sub?: string;
  [key: string]: any;
}

const Main: React.FC = () => {
  const [user, setUser] = useState<User>({});

  const handleCallbackResponse = (response: any) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    const user_object = jwt_decode(response.credential) as User;
    console.log(user_object);
    setUser(user_object);
  };

  const handleSignOut = (event: any) => {
    setUser({});
    // Re-render the Google Sign-In button after signing out
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: GSI_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  }, []);

  return <LoginView user={user} handleSignOut={handleSignOut} />;
};

export default Main;
