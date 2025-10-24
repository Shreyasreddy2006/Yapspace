import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp, ACTIONS } from '../context/AppContext.jsx';
import { useSwipeGestures } from '../hooks/useSwipeGestures.jsx';

const LandingPage = () => {
  const [userName, setUserName] = useState('');
  const { dispatch } = useApp();
  const navigate = useNavigate();
  
  // Enable swipe gestures
  useSwipeGestures();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      dispatch({ type: ACTIONS.SET_USER, payload: userName.trim() });
      navigate('/chat');
    }
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
          <div className="text-center mb-12 animate-slideDown">
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
          
          {/* Input Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-yapspace-xl border border-white/20 animate-slideUp">
            
            {/* Input Section */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <label className="block text-white/90 font-poppins font-medium text-body">
                  What should we call you? 👋
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-6 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 rounded-2xl-pill text-body font-poppins text-white placeholder-white/60 transition-all duration-500 focus:border-yapspace-yellow focus:bg-white/30 focus:shadow-yapspace focus:scale-105 outline-none"
                    required
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl">
                    ✍️
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-yapspace-yellow to-yapspace-accent text-yapspace-dark font-poppins font-bold text-body py-4 px-8 rounded-pill transition-all duration-500 transform hover:scale-105 hover:shadow-yapspace-lg hover:-translate-y-2 active:scale-95 active:translate-y-0 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Start Chatting</span>
                    <span className="text-xl group-hover:animate-wiggle">💬</span>
                  </span>
                  
                  {/* Button Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yapspace-accent to-yapspace-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-pill"></div>
                </button>
              </div>
            </form>
            
            {/* Features Preview */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2 animate-fadeIn" style={{ animationDelay: '0.9s' }}>
                  <div className="text-2xl">⚡</div>
                  <p className="text-caption text-white/70 font-poppins">Real-time</p>
                </div>
                <div className="space-y-2 animate-fadeIn" style={{ animationDelay: '1.1s' }}>
                  <div className="text-2xl">🔒</div>
                  <p className="text-caption text-white/70 font-poppins">Secure</p>
                </div>
                <div className="space-y-2 animate-fadeIn" style={{ animationDelay: '1.3s' }}>
                  <div className="text-2xl">📱</div>
                  <p className="text-caption text-white/70 font-poppins">Mobile</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Decoration */}
          <div className="text-center mt-8 animate-fadeIn" style={{ animationDelay: '1.5s' }}>
            <p className="text-caption text-white/50 font-poppins">
              Swipe up or click to continue →
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
