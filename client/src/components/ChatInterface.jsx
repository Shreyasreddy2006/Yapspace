import React, { useState, useEffect, useRef } from 'react';
import { useApp, ACTIONS } from '../context/AppContext.jsx';
import { useWebSocket } from '../hooks/useWebSocket.jsx';
import { useSwipeGestures } from '../hooks/useSwipeGestures.jsx';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const { state, dispatch } = useApp();
  const { isConnected, error, sendMessage, fetchMessages, saveMessage } = useWebSocket();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Enable swipe gestures
  useSwipeGestures();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      alert('Please type something!');
      return;
    }

    if (!isConnected) {
      alert('Not connected to server. Please try again.');
      return;
    }

    const messageText = message.trim();
    const currentUser = state.user;

    // Add message to local state immediately
    const newMessage = {
      id: Date.now(),
      user: currentUser,
      text: messageText,
      timestamp: new Date(),
      isReceived: false,
    };
    
    dispatch({ type: ACTIONS.ADD_MESSAGE, payload: newMessage });
    setMessage('');

    // Send via WebSocket
    const wsSent = sendMessage(messageText);
    
    // Save to database
    if (wsSent) {
      await saveMessage(messageText);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-cover bg-center bg-no-repeat relative overflow-hidden"
         style={{ backgroundImage: "url('https://platform.polygon.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/6401113/c42ac6a0c2aaee69c79955d1d32c54b4_large.0.jpeg?quality=90&strip=all&crop=3.125,0,93.75,100')" }}>
      
      {/* Creative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-yapspace-yellow/5 via-transparent to-yapspace-yellow/10 z-10"></div>
      
      {/* WhatsApp-style Header */}
      <div className="relative z-20 bg-gradient-to-r from-yapspace-yellow to-yapspace-accent shadow-yapspace-lg border-b border-white/20">
        <div className="flex items-center justify-between px-6 py-4">
          
          {/* Left side - Back button and title */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="font-creative text-yapspace-dark text-title font-bold">
                YapSpace
              </h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-caption text-yapspace-dark/80 font-poppins">
                  {isConnected ? 'Online' : 'Connecting...'}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side - User info */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-caption text-yapspace-dark/80 font-poppins">Welcome back,</p>
              <p className="text-body text-yapspace-dark font-poppins font-semibold">{state.user?.displayName}</p>
            </div>
            <div className="w-10 h-10 bg-yapspace-dark rounded-full flex items-center justify-center">
              <span className="text-yapspace-yellow text-lg">👤</span>
            </div>
            <button
              onClick={() => {
                dispatch({ type: ACTIONS.LOGOUT });
              }}
              className="p-2 rounded-full hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              title="Logout"
            >
              <span className="text-2xl">🚪</span>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area - WhatsApp style */}
      <div className="flex-1 overflow-y-auto relative z-20 px-4 py-6 space-y-3">
        {state.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <div className="text-6xl animate-float">💬</div>
            <h3 className="text-title text-white/90 font-poppins font-semibold">
              Start the conversation!
            </h3>
            <p className="text-body text-white/70 font-poppins max-w-sm">
              Be the first to send a message and get the chat rolling 🚀
            </p>
          </div>
        ) : (
          state.messages.map((msg, index) => {
            const prevMsg = state.messages[index - 1];
            const showAvatar = !prevMsg || prevMsg.user !== msg.user || prevMsg.isReceived !== msg.isReceived;
            
            return (
              <div
                key={msg.id}
                className={`flex items-end space-x-2 ${msg.isReceived ? 'justify-start' : 'justify-end'} animate-fadeIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Avatar for received messages */}
                {msg.isReceived && showAvatar && (
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">👤</span>
                  </div>
                )}
                
                {/* Spacer for sent messages */}
                {!msg.isReceived && <div className="w-8"></div>}
                
                {/* Message bubble */}
                <div className={`max-w-xs md:max-w-md lg:max-w-lg group`}>
                  {/* Username for received messages */}
                  {msg.isReceived && showAvatar && (
                    <p className="text-caption text-white/70 font-poppins mb-1 ml-2">
                      {msg.user}
                    </p>
                  )}
                  
                  {/* Message content */}
                  <div
                    className={`px-4 py-3 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                      msg.isReceived
                        ? 'bg-white/95 text-gray-800 rounded-bl-md'
                        : 'bg-gradient-to-r from-yapspace-yellow to-yapspace-accent text-yapspace-dark rounded-br-md'
                    }`}
                  >
                    <p className="text-body font-poppins break-words leading-relaxed">
                      {msg.text}
                    </p>
                    
                    {/* Timestamp */}
                    <div className={`text-caption mt-2 flex items-center space-x-1 ${
                      msg.isReceived ? 'text-gray-500' : 'text-yapspace-dark/70'
                    }`}>
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      {!msg.isReceived && (
                        <span className="text-xs">✓✓</span>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Avatar for sent messages */}
                {!msg.isReceived && showAvatar && (
                  <div className="w-8 h-8 bg-yapspace-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yapspace-yellow text-sm">👤</span>
                  </div>
                )}
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="relative z-20 mx-4 mb-4 bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-red-400/50 animate-slideUp">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">⚠️</span>
              <span className="font-poppins text-body">{error}</span>
            </div>
            <button
              onClick={() => dispatch({ type: ACTIONS.CLEAR_ERROR })}
              className="text-white/80 hover:text-white transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* WhatsApp-style Input Area */}
      <div className="relative z-20 bg-white/95 backdrop-blur-xl border-t border-white/20 p-4">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
          
          {/* Emoji Button */}
          <button
            type="button"
            className="w-12 h-12 bg-yapspace-yellow/20 hover:bg-yapspace-yellow/30 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
          >
            <span className="text-xl">😊</span>
          </button>
          
          {/* Message Input */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl-pill text-body font-poppins transition-all duration-300 focus:border-yapspace-yellow focus:bg-white focus:shadow-yapspace outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isConnected}
            />
            {message && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yapspace-yellow">
                ✍️
              </div>
            )}
          </div>
          
          {/* Send Button */}
          <button
            type="submit"
            disabled={!isConnected || !message.trim()}
            className="group w-12 h-12 bg-gradient-to-r from-yapspace-yellow to-yapspace-accent rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:shadow-yapspace disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="text-xl group-hover:animate-wiggle">
              {message.trim() ? '🚀' : '📤'}
            </span>
          </button>
        </form>
        
        {/* Connection Status */}
        <div className="flex items-center justify-center mt-2 space-x-2">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className="text-caption text-gray-600 font-poppins">
            {isConnected ? 'Connected' : 'Reconnecting...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
