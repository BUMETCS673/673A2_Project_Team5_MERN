import React from 'react';
import backgroundImage from './engin-akyurt-IZj7vckPGiw-unsplash.jpg';

interface User {
  picture?: string;
  name?: string;
  sub?: string;
  [key: string]: any;
}

interface LoginViewProps {
  user: User;
  handleSignOut: (event: any) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ user, handleSignOut }) => {
  return (
    <div
      className="App"
      style={{
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
        <div
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h1 style={{ textAlign: 'center', fontSize: '2.5em' }}>Welcome</h1>
          <h2 style={{ textAlign: 'center', fontSize: '2em' }}>Note Ant</h2>

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

          {Object.keys(user).length === 0 ? (
            <div
              id="signInDiv"
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginBottom: '20px',
              }}
            ></div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <img src={user.picture} alt="User" />
              <h3>{user.name}</h3>
              <button onClick={(e) => handleSignOut(e)} style={{ margin: '20px' }}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};
