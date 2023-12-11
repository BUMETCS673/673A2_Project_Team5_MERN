import React, { useContext, useEffect, useState } from 'react';
declare var google: any;
import jwt_decode from 'jwt-decode';
import { GSI_CLIENT_ID } from './config';
import { LoginView } from './view';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User } from '@/models/user';
import { AuthContext } from '../../hooks/authContext';
import { GoogleUser } from '../../models/googleUser';

const Login: React.FC = () => {
  // // State to hold the user's information
  // const [user, setUser] = useState<User>({});
  const { isAuthenticated, user, login, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const sendTokenToBackend = async (token: string) => {
    try {
      const response = await axios.post('http://localhost:8000/login', { token: token });
      window.localStorage.setItem('accessToken', JSON.stringify(response.data));
      console.log(window.localStorage.getItem('accessToken'));
      //console.log('Token sent successfully:', response.data);
      console.log('access token is made of username, user_id, and user_pic');
      axios.defaults.headers.common['authorization'] = response.data.accessToken;


      //if successfully send the token, navigate to home page
      navigate('/home');
    } catch (error) {
      console.error('Error sending token:', error);
      window.alert('There may be a problem in sending token');
    }
  };

  // Callback function to handle the response after Google Sign-In
  const handleCallbackResponse = (response: any) => {
    // Decode the JWT token to get user's information
    const user_object: GoogleUser = jwt_decode(response.credential);
    // Update the user state with the decoded information
    login({
      user_name: user_object.name,
      user_pic: user_object.picture,
      user_id: user_object.sub
    });

    // Send the JWT ID token to the backend
    //localStorage.setItem('googleToken', response.credential);
    sendTokenToBackend(response.credential);
  };

  // Function to handle user sign out
  const handleSignOut = (event: any) => {
    // Reset the user state to empty
    //localStorage.removeItem('googleToken');
    localStorage.removeItem('accessToken');
    logout();
    // Re-render the Google Sign-In button after signing out
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
    });
  };

  // UseEffect hook to initialize Google Sign-In button on component mount
  useEffect(() => {
    // Initialize Google Sign-In with client ID and callback function
    google.accounts.id.initialize({
      client_id: GSI_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    // Render the Google Sign-In button
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      theme: 'outline',
      size: 'large',
      width: '400px',
    });
  }, []);

  // Render the LoginView component and pass user and handleSignOut as props
  return <LoginView user={user} handleSignOut={handleSignOut} />;
};

export default Login;
