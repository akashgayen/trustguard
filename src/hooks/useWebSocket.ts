import { useState, useEffect, useRef } from 'react';

export const useWebSocket = (url: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'Connecting' | 'Open' | 'Closing' | 'Closed'>('Closed');
  const reconnectTimeoutRef = useRef<number>();
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  useEffect(() => {
    const connect = () => {
      try {
        console.log(`🔌 Attempting WebSocket connection to ${url}...`);
        const ws = new WebSocket(url);
        
        ws.onopen = () => {
          console.log('✅ WebSocket connected successfully');
          setConnectionStatus('Open');
          setSocket(ws);
          reconnectAttempts.current = 0;
        };
        
        ws.onmessage = (event) => {
          console.log('📨 WebSocket message received:', event.data);
          setLastMessage(event.data);
        };
        
        ws.onclose = (event) => {
          console.log(`🔌 WebSocket disconnected (code: ${event.code})`);
          setConnectionStatus('Closed');
          setSocket(null);
          
          // Attempt to reconnect with exponential backoff
          if (reconnectAttempts.current < maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 10000);
            reconnectAttempts.current++;
            
            console.log(`🔄 Reconnecting in ${delay}ms (attempt ${reconnectAttempts.current}/${maxReconnectAttempts})`);
            
            reconnectTimeoutRef.current = setTimeout(() => {
              connect();
            }, delay);
          } else {
            console.log('❌ Max reconnection attempts reached');
          }
        };
        
        ws.onerror = (error) => {
          console.error('❌ WebSocket error:', error);
        };
        
        setConnectionStatus('Connecting');
      } catch (error) {
        console.error('❌ Failed to create WebSocket connection:', error);
        setConnectionStatus('Closed');
      }
    };

    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      return true;
    }
    console.warn('⚠️ WebSocket not connected, cannot send message');
    return false;
  };

  return {
    socket,
    lastMessage,
    connectionStatus,
    sendMessage
  };
};