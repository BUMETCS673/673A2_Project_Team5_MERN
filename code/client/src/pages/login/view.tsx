import React from 'react';
import backgroundImage from './kelly-sikkema-Oz_J_FXKvIs-unsplash.jpg';
import './LoginView.css'; // Import the CSS file

// Define the User interface with optional properties: picture, name, and sub.
interface User {
  picture?: string;
  name?: string;
  sub?: string;
  [key: string]: any;
}

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

          {/* Conditional rendering based on whether the user is logged in or not */}
          {Object.keys(user).length === 0 ? (
            <div id="signInDiv" className="signInDiv"></div>
          ) : (
            <div className="user-details">
              <img src={user.picture} alt="User" />
              <h3>{user.name}</h3>
              <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
