import React from 'react';
import backgroundImage from './kelly-sikkema-Oz_J_FXKvIs-unsplash.jpg';
import './LoginView.css'; // Import the CSS file
import { User } from '../../models/user';

// Define the User interface with optional properties: picture, name, and sub.

// Define the properties that the LoginView component expects.
interface LoginViewProps {
  user: User;
  handleSignOut: (event: any) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ user, handleSignOut }) => {
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className="App-header">
        {/* Create a white box to contain the main content */}
        <div className="white-box">
          {/* Display the welcome message using the "Georgia" font */}
          <h1>Welcome back</h1>
          <h2>Note Ant</h2>

          {user ? (
            <div className="user-details">
              <img src={user?.user_pic} alt="User" />
              <div className="username-container">
                <h3>{user?.user_name}</h3>
              </div>
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            </div>
          ) : <div id="signInDiv" className="signInDiv"></div>}

          {/* If the user is not logged in, display the Google Sign-In button */}
          {/* {Object.keys(user).length === 0 && <div id="signInDiv" className="signInDiv"></div>} */}

          {/* If the user is logged in, display their details and a sign-out button */}
          {/* {Object.keys(user).length !== 0 && (
            <div className="user-details">
              <img src={user.picture} alt="User" />
              <div className="username-container">
                <h3>{user.name}</h3>
              </div>
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            </div>
          )} */}
        </div>
      </header>
    </div>
  );
};
