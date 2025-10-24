import { useEffect, useRef, useCallback } from 'react';
import { useApp, ACTIONS } from '../context/AppContext.jsx';

const WS_URL = import.meta.env.VITE_WS_URL;
const API_URL = `${import.meta.env.VITE_API_URL}/Messages`;

export const useWebSocket = () => {
  const { state, dispatch } = useApp();
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const wsUrl = state.token ? `${WS_URL}?token=${state.token}` : WS_URL;
      wsRef.current = new WebSocket(wsUrl);
      
      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        dispatch({ type: ACTIONS.SET_CONNECTION_STATUS, payload: true });
        dispatch({ type: ACTIONS.CLEAR_ERROR });
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === 'message') {
            const messageData = {
              id: Date.now(),
              user: data.user,
              text: data.message,
              timestamp: new Date(data.timestamp),
              isReceived: data.user !== state.user?.displayName,
            };
            dispatch({ type: ACTIONS.ADD_MESSAGE, payload: messageData });
          } else if (data.type === 'user_joined' || data.type === 'user_left') {
            const notificationData = {
              id: Date.now(),
              user: 'System',
              text: data.message,
              timestamp: new Date(),
              isReceived: true,
              isSystemMessage: true,
            };
            dispatch({ type: ACTIONS.ADD_MESSAGE, payload: notificationData });
          }
        } catch (error) {
          const messageData = {
            id: Date.now(),
            text: event.data,
            timestamp: new Date(),
            isReceived: true,
          };
          dispatch({ type: ACTIONS.ADD_MESSAGE, payload: messageData });
        }
      };

      wsRef.current.onclose = () => {
        console.log('WebSocket disconnected');
        dispatch({ type: ACTIONS.SET_CONNECTION_STATUS, payload: false });
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3000);
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Connection error. Retrying...' });
      };

    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to connect to server' });
    }
  }, [dispatch]);

  const sendMessage = useCallback((message) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const messageData = {
        message: message,
        user: state.user?.displayName || 'Anonymous'
      };
      wsRef.current.send(JSON.stringify(messageData));
      return true;
    } else {
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Not connected to server' });
      return false;
    }
  }, [dispatch, state.user]);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const messages = await response.json();
      
      const formattedMessages = messages.map(msg => ({
        id: msg._id || Date.now() + Math.random(),
        user: msg.user,
        text: msg.message,
        timestamp: new Date(msg.time),
        isReceived: msg.user !== state.user,
      }));
      
      dispatch({ type: ACTIONS.SET_MESSAGES, payload: formattedMessages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load message history' });
    }
  }, [dispatch, state.user]);

  const saveMessage = useCallback(async (message) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': state.token ? `Bearer ${state.token}` : '',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to save message');
      }

      return true;
    } catch (error) {
      console.error('Error saving message:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to save message' });
      return false;
    }
  }, [dispatch, state.token]);

  useEffect(() => {
    connect();
    
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return {
    isConnected: state.isConnected,
    error: state.error,
    sendMessage,
    fetchMessages,
    saveMessage,
    reconnect: connect,
  };
};
