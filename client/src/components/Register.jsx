import React, { useState } from 'react';
import { useApp, ACTIONS } from '../context/AppContext.jsx';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [errors, setErrors] = useState({});
  const { dispatch } = useApp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.displayName) {
      newErrors.displayName = 'Display name is required';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    dispatch({ type: ACTIONS.CLEAR_ERROR });
    
    try {
      const response = await fetch('https://yapspace-9oex.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Registration successful
        dispatch({ type: ACTIONS.SET_TOKEN, payload: data.token });
        dispatch({ type: ACTIONS.SET_USER, payload: data.user });
        dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
        dispatch({ type: ACTIONS.CLEAR_ERROR });
      } else {
        // Registration failed
        dispatch({ type: ACTIONS.SET_ERROR, payload: data.error || 'Registration failed' });
      }
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Network error. Please try again.' });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-yapspace-xl border border-white/20 animate-slideUp">
      <div className="text-center mb-8">
        <h2 className="text-title text-white font-creative mb-2">Join YapSpace! 🎉</h2>
        <p className="text-body text-white/70 font-poppins">Create your account to start chatting</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/90 font-poppins font-medium text-body mb-2">
              Username 👤
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border-2 rounded-2xl-pill text-body font-poppins text-white placeholder-white/60 transition-all duration-300 focus:border-yapspace-yellow focus:bg-white/30 focus:shadow-yapspace outline-none ${
                errors.username ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="Choose a username..."
            />
            {errors.username && (
              <p className="text-red-400 text-caption mt-1 font-poppins">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label className="block text-white/90 font-poppins font-medium text-body mb-2">
              Display Name 💬
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border-2 rounded-2xl-pill text-body font-poppins text-white placeholder-white/60 transition-all duration-300 focus:border-yapspace-yellow focus:bg-white/30 focus:shadow-yapspace outline-none ${
                errors.displayName ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="How should we call you?"
            />
            {errors.displayName && (
              <p className="text-red-400 text-caption mt-1 font-poppins">{errors.displayName}</p>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-white/90 font-poppins font-medium text-body mb-2">
            Email Address 📧
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border-2 rounded-2xl-pill text-body font-poppins text-white placeholder-white/60 transition-all duration-300 focus:border-yapspace-yellow focus:bg-white/30 focus:shadow-yapspace outline-none ${
              errors.email ? 'border-red-400' : 'border-white/30'
            }`}
            placeholder="Enter your email..."
          />
          {errors.email && (
            <p className="text-red-400 text-caption mt-1 font-poppins">{errors.email}</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/90 font-poppins font-medium text-body mb-2">
              Password 🔒
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border-2 rounded-2xl-pill text-body font-poppins text-white placeholder-white/60 transition-all duration-300 focus:border-yapspace-yellow focus:bg-white/30 focus:shadow-yapspace outline-none ${
                errors.password ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="Create a password..."
            />
            {errors.password && (
              <p className="text-red-400 text-caption mt-1 font-poppins">{errors.password}</p>
            )}
          </div>
          
          <div>
            <label className="block text-white/90 font-poppins font-medium text-body mb-2">
              Confirm Password 🔐
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/20 backdrop-blur-sm border-2 rounded-2xl-pill text-body font-poppins text-white placeholder-white/60 transition-all duration-300 focus:border-yapspace-yellow focus:bg-white/30 focus:shadow-yapspace outline-none ${
                errors.confirmPassword ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="Confirm your password..."
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-caption mt-1 font-poppins">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yapspace-yellow to-yapspace-accent text-yapspace-dark font-poppins font-bold text-body py-4 px-8 rounded-pill transition-all duration-500 transform hover:scale-105 hover:shadow-yapspace-lg hover:-translate-y-2 active:scale-95 active:translate-y-0"
        >
          Create Account 🚀
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-caption text-white/70 font-poppins">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="text-yapspace-yellow hover:text-yapspace-accent font-semibold transition-colors duration-300"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
