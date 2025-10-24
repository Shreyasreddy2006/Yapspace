import React, { useState } from 'react';
import { useApp, ACTIONS } from '../context/AppContext.jsx';

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { dispatch } = useApp();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://yapspace-9oex.onrender.com'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch({ type: ACTIONS.SET_TOKEN, payload: data.token });
        dispatch({ type: ACTIONS.SET_USER, payload: data.user });
        dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
        dispatch({ type: ACTIONS.CLEAR_ERROR });
      } else {
        dispatch({ type: ACTIONS.SET_ERROR, payload: data.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Network error. Please try again.' });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-yapspace-xl border border-white/20 animate-slideUp">
      <div className="text-center mb-8">
        <h2 className="text-title text-white font-creative mb-2">Welcome Back! 👋</h2>
        <p className="text-body text-white/70 font-poppins">Sign in to continue chatting</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
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
              placeholder="Enter your password..."
            />
            {errors.password && (
              <p className="text-red-400 text-caption mt-1 font-poppins">{errors.password}</p>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yapspace-yellow to-yapspace-accent text-yapspace-dark font-poppins font-bold text-body py-4 px-8 rounded-pill transition-all duration-500 transform hover:scale-105 hover:shadow-yapspace-lg hover:-translate-y-2 active:scale-95 active:translate-y-0"
        >
          Sign In 🚀
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-caption text-white/70 font-poppins">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="text-yapspace-yellow hover:text-yapspace-accent font-semibold transition-colors duration-300"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
