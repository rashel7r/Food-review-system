import { useState } from 'react';
import './LoginForm.css';
import { BsCheckCircleFill } from 'react-icons/bs';

const SignUpForm = ({ onSignUp, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: 'Rashel',
    username: 'Rashel222',
    email: 'Rashel@gmail.com',
    password: 'Rashel222'
  });
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
        email: "'@' is missing, enter valid email"
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    // Check for empty fields
    if (!formData.name.trim()) {
      errors.name = 'This field is required';
    }
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
      errors.email = "'@' is missing, enter valid email";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Show success message
    setShowSuccess(true);
    
    // Wait for 1.5 seconds to show the success message
    setTimeout(() => {
      onSignUp(formData);
      setShowSuccess(false);
    }, 1500);
  };

  return (
    <div className="signup-bg-wrapper">
      <div className="login-form-container">
        {showSuccess && (
          <div className="edit-profile-success">
            <BsCheckCircleFill className="edit-profile-success-icon" />
            <p>Account successfully created!</p>
          </div>
        )}
        <h2 className="login-title">Create Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={fieldErrors.name ? 'error' : ''}
            />
            {fieldErrors.name && (
              <div className="error-message">{fieldErrors.name}</div>
            )}
          </div>

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

          <button type="submit" className="login-button">Sign Up</button>
        </form>

        <div className="form-switch">
          Already have an account?{' '}
          <button className="switch-link" onClick={onSwitchToLogin}>
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm; 