import { useState, useEffect } from 'react';
import './LoginForm.css';
import { BsCheckCircleFill } from 'react-icons/bs';

const LoginForm = ({ onLogin, onSwitchToSignUp, showNoAccountError, onCloseNoAccountError }) => {
  const [formData, setFormData] = useState({
    username: 'Rashel222',
    email: 'Rashel@gmail.com',
    password: 'Rashel222'
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Real-time validation for email
    if (name === 'email' && value && !value.includes('@')) {
      setFieldErrors(prev => ({
        ...prev,
        email: 'Email must contain @ symbol'
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Check for empty fields
    if (!formData.username.trim()) {
      errors.username = 'This field is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'This field is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'This field is required';
    }

    // Email format validation
    if (formData.email && !formData.email.includes('@')) {
      errors.email = 'Email must contain @ symbol';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Show success message
    setShowSuccess(true);
    
    // Wait for 1.5 seconds to show the success message
    setTimeout(() => {
      onLogin(formData);
    }, 1500);
  };

  // Auto-dismiss no-account error popup after 2 seconds
  useEffect(() => {
    if (showNoAccountError) {
      const timer = setTimeout(() => {
        onCloseNoAccountError();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showNoAccountError, onCloseNoAccountError]);

  return (
    <div className="login-bg-wrapper">
      <div className="login-form-container">
        {showSuccess && !showNoAccountError && (
          <div className="login-success-popup">
            <BsCheckCircleFill className="login-success-icon" />
            <span>Welcome, {formData.username}!</span>
          </div>
        )}
        {showNoAccountError && (
          <div className="login-error-popup">
            <span>Please, create an account before login</span>
            <button className="close-error-btn" onClick={onCloseNoAccountError}>&times;</button>
          </div>
        )}
        <h2 className="login-title">User Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={fieldErrors.username ? 'error' : ''}
            />
            {fieldErrors.username && (
              <div className="error-message">{fieldErrors.username}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={fieldErrors.email ? 'error' : ''}
            />
            {fieldErrors.email && (
              <div className="error-message">{fieldErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={fieldErrors.password ? 'error' : ''}
            />
            {fieldErrors.password && (
              <div className="error-message">{fieldErrors.password}</div>
            )}
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="form-switch">
          Don't have an account?{' '}
          <button className="switch-link" onClick={onSwitchToSignUp}>
            Sign up here
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 