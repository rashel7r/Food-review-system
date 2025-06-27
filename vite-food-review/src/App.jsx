import { useState } from 'react';
import './App.css';
import FeedbackDisplay from "./assets/components/FeedbackDisplay";
import UserProfile from "./assets/components/UserProfile";
import LoginForm from "./assets/components/LoginForm";
import SignUpForm from "./assets/components/SignUpForm";
import Feedback from "./assets/components/Feedback";
import { Routes, Route } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [showNoAccountError, setShowNoAccountError] = useState(false);

  const handleLogin = (userData) => {
    // Check if user exists in registered users
    const existingUser = registeredUsers.find(
      user => user.username === userData.username && 
              user.email === userData.email
    );

    if (existingUser) {
      setIsAuthenticated(true);
      setUser({
        name: existingUser.name,
        username: existingUser.username,
        email: existingUser.email,
        avatar: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&h=256&q=80",
        posts: 0,
        followers: 89,
        following: 300,
        about: "Food Explorer"
      });
    } else {
      // Show error message for no account
      setShowNoAccountError(true);
      setTimeout(() => {
        setShowSignUp(true);
      }, 2000);
    }
  };

  const handleSignUp = (userData) => {
    // Add new user to registered users
    setRegisteredUsers(prev => [...prev, userData]);
    
    // Show success message and switch to login
    setShowSignUp(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const switchToSignUp = () => {
    setShowSignUp(true);
  };

  const switchToLogin = () => {
    setShowSignUp(false);
  };

  const handleCloseNoAccountError = () => {
    setShowNoAccountError(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          !isAuthenticated ? (
            <div className="login-page">
              {showSignUp ? (
                <SignUpForm onSignUp={handleSignUp} onSwitchToLogin={switchToLogin} />
              ) : (
                <LoginForm onLogin={handleLogin} onSwitchToSignUp={switchToSignUp} 
                  showNoAccountError={showNoAccountError}
                  onCloseNoAccountError={handleCloseNoAccountError}
                />
              )}
            </div>
          ) : (
            <UserProfile initialUser={user} onLogout={handleLogout} />
          )
        } />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/feedback-display" element={<FeedbackDisplay />} />
      </Routes>
    </div>
  );
}

export default App;
