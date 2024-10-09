import { Stomp } from '@stomp/stompjs';
import React from 'react';
import SockJS from 'sockjs-client';
import { useNotification } from '../../hooks/notifications/UseNotification';
import ChatNotificationLayout from '../../components/layouts/components/ChatNotificationLayout';

const BACKEND_CHAT = `${process.env.REACT_APP_API_HOST}/chat`;
const DESTINATION_CHAT = '/webchat/chat';
const SUBSCRIBE_MESSAGE_TOPIC = '/topic/messages';
const SUBSCRIBE_NOTIFICATION_TOPIC = '/topic/notifications';

const WebSocketContext = React.createContext(null);

export const useWebSocket = () => {
  return React.useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [connected, setConnected] = React.useState(false);
  const socketRef = React.useRef(null);
  const stompClientRef = React.useRef(null);
  const messageSubRef = React.useRef(null);

  const { notifyInfo } = useNotification();

  const playNotificationSound = React.useCallback(() => {
    const audio = new Audio('/audio/livechat-129007.mp3');
    audio.play();
  }, []);

  const connect = React.useCallback(
    (subscribeMessage, subscribeNotification, roomId, userId, setMessages) => {
      socketRef.current = new SockJS(BACKEND_CHAT);
      stompClientRef.current = Stomp.over(socketRef.current);

      stompClientRef.current.connect(
        {},
        () => {
          setConnected(true);
          console.log('Connected to WebSocket');

          if (subscribeMessage) {
            messageSubRef.current = stompClientRef.current.subscribe(
              `${SUBSCRIBE_MESSAGE_TOPIC}/${roomId}`,
              (message) => {
                playNotificationSound();
                console.log('Message received:', JSON.parse(message.body));
                setMessages((prevMessages) => [
                  ...prevMessages,
                  JSON.parse(message.body),
                ]);
              },
            );
            console.log('Subscribed to messages');
          }

          if (subscribeNotification) {
            stompClientRef.current.subscribe(
              `${SUBSCRIBE_NOTIFICATION_TOPIC}/${userId}`,
              (notification) => {
                const payload = JSON.parse(notification.body);
                notifyInfo(<ChatNotificationLayout payload={payload} />);
              },
            );
          }
        },
        (error) => {
          console.error('Error connecting to WebSocket:', error);
        },
      );
    },
    [notifyInfo, playNotificationSound],
  );

  const connectWithMessageAndNotification = React.useCallback(
    (setMessages, roomId, userId) => {
      connect(true, true, roomId, userId, setMessages);
    },
    [connect],
  );

  const connectOnlyNotification = React.useCallback(
    (userId) => {
      connect(false, true, null, userId, null);
    },
    [connect],
  );

  const disconnect = React.useCallback(() => {
    if (stompClientRef.current) {
      if (messageSubRef.current) messageSubRef.current.unsubscribe();
      stompClientRef.current.disconnect(() => {
        setConnected(false);
        console.log('Disconnected from WebSocket');
      });
    }
  }, []);

  const unsubscribeFromMessages = React.useCallback(() => {
    if (messageSubRef.current) {
      messageSubRef.current.unsubscribe();
      messageSubRef.current = null;
      console.log('Unsubscribed from messages');
    }
  }, []);

  const sendMessage = React.useCallback(
    (roomId, messageContent) => {
      if (stompClientRef.current && connected) {
        stompClientRef.current.publish({
          destination: `${DESTINATION_CHAT}/${roomId}`,
          body: JSON.stringify(messageContent),
        });
        console.log('Message sent:', messageContent);
      }
    },
    [connected],
  );

  const value = {
    connectOnlyNotification,
    connectWithMessageAndNotification,
    disconnect,
    unsubscribeFromMessages,
    sendMessage,
    connected,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
