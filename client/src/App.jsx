import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext.jsx';
import AuthPage from './components/AuthPage.jsx';
import ChatInterface from './components/ChatInterface.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { state } = useApp();
  
  if (!state.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return children;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }) => {
  const { state } = useApp();
  
  if (state.isAuthenticated) {
    return <Navigate to="/chat" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/auth" 
              element={
                <PublicRoute>
                  <AuthPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <ChatInterface />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Navigate to="/auth" replace />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;