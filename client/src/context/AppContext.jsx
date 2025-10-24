import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  messages: [],
  isConnected: false,
  error: null,
  isAuthenticated: false,
  isLoading: false,
};

export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_TOKEN: 'SET_TOKEN',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_LOADING: 'SET_LOADING',
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_MESSAGES: 'SET_MESSAGES',
  SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  LOGOUT: 'LOGOUT',
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USER:
      return { ...state, user: action.payload };
    
    case ACTIONS.SET_TOKEN:
      if (action.payload) {
        localStorage.setItem('token', action.payload);
      } else {
        localStorage.removeItem('token');
      }
      return { ...state, token: action.payload };
    
    case ACTIONS.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTIONS.ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    
    case ACTIONS.SET_MESSAGES:
      return { ...state, messages: action.payload };
    
    case ACTIONS.SET_CONNECTION_STATUS:
      return { ...state, isConnected: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ACTIONS.CLEAR_ERROR:
      return { ...state, error: null };
    
    case ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        messages: [],
        isConnected: false,
        error: null
      };
    
    default:
      return state;
  }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
