import React from 'react';
import backgroundImage from './kelly-sikkema-Oz_J_FXKvIs-unsplash.jpg';

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
    <div
      className="App"
      style={{
        // Set the background image for the entire view
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <header className="App-header">
        {/* Create a white box to contain the main content */}
        <div
          style={{
            backgroundColor: 'white',
            padding: '40px', // Increased padding for a larger white box
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '100%', // Increased width for a larger white box
            height: '100%', // Increased height for a larger white box
          }}
        >
          {/* Display the welcome message using the "Georgia" font */}
          <h1 style={{ textAlign: 'center', fontSize: '3em', fontFamily: 'Georgia' }}>
            Welcome back
          </h1>
          <h2 style={{ textAlign: 'center', fontSize: '2.5em', fontFamily: 'Georgia' }}>
            Note Ant
          </h2>

          {/* If the user is not logged in, display the Google Sign-In button */}
          {Object.keys(user).length === 0 && (
            <div
              id="signInDiv"
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginBottom: '20px',
              }}
            ></div>
          )}

          {/* If the user is logged in, display their details and a sign-out button */}
          {Object.keys(user).length !== 0 && (
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
