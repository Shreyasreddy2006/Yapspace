import React, { useState, useEffect } from 'react';
import { useApp, ACTIONS } from '../context/AppContext.jsx';
import Login from './Login';
import Register from './Register';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { state, dispatch } = useApp();

  // Check if user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      if (state.token) {
        try {
          const response = await fetch('https://yapspace-9oex.onrender.com/auth/profile', {
            headers: {
              'Authorization': `Bearer ${state.token}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            dispatch({ type: ACTIONS.SET_USER, payload: data.user });
            dispatch({ type: ACTIONS.SET_AUTHENTICATED, payload: true });
          } else {
            // Token is invalid, clear it
            dispatch({ type: ACTIONS.LOGOUT });
          }
        } catch (error) {
          console.error('Auth check error:', error);
          dispatch({ type: ACTIONS.LOGOUT });
        }
      }
    };
    
    checkAuth();
  }, [state.token, dispatch]);

  const handleSwitchToRegister = () => {
    setIsLogin(false);
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true);
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden" 
         style={{ backgroundImage: "url('/images/indexbg.jpg')" }}>
      
      {/* Creative Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-yapspace-yellow/10 z-10"></div>
      
      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 text-6xl animate-float z-20">💬</div>
      <div className="absolute top-32 right-16 text-4xl animate-float z-20" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-32 left-20 text-5xl animate-float z-20" style={{ animationDelay: '2s' }}>🚀</div>
      <div className="absolute bottom-20 right-10 text-3xl animate-float z-20" style={{ animationDelay: '0.5s' }}>💫</div>
      
      {/* Main Content Container */}
      <div className="relative z-30 flex justify-center items-center min-h-screen p-6">
        <div className="w-full max-w-lg">
          
          {/* Hero Section */}
          <div className="text-center mb-8 animate-slideDown">
            <div className="inline-block mb-6">
              <h1 className="text-hero md:text-display font-creative text-yapspace-yellow drop-shadow-2xl animate-bounceIn">
                YapSpace
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-yapspace-yellow to-yapspace-accent mx-auto rounded-pill animate-pulse-glow"></div>
            </div>
            
            <p className="text-subtitle text-white/90 font-poppins font-medium mb-2 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              Let the yapping begin! 🎉
            </p>
            <p className="text-body text-white/70 font-poppins animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              Connect, chat, and share moments in real-time
            </p>
          </div>
          
          {/* Auth Form */}
          {isLogin ? (
            <Login onSwitchToRegister={handleSwitchToRegister} />
          ) : (
            <Register onSwitchToLogin={handleSwitchToLogin} />
          )}
          
          {/* Error Display */}
          {state.error && (
            <div className="mt-6 bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-red-400/50 animate-slideUp">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">⚠️</span>
                <span className="font-poppins text-body">{state.error}</span>
              </div>
            </div>
          )}
          
          {/* Loading Indicator */}
          {state.isLoading && (
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 text-white/70">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yapspace-yellow"></div>
                <span className="font-poppins text-body">Processing...</span>
              </div>
            </div>
          )}
          
          {/* Bottom Decoration */}
          <div className="text-center mt-8 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
            <p className="text-caption text-white/50 font-poppins">
              Secure • Real-time • Fun 🎯
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
