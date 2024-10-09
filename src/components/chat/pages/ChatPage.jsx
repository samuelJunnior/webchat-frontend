// src/components/ChatPage.js
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';

import {
  ChatContent,
  ChatForm,
  ChatHeader,
  ChatWrapper,
  MessageContent,
  MessageItem,
  SendButton,
  TextAreaChat,
} from '../ChatStyled.js';

import { useNavigate, useParams } from 'react-router-dom';
import { useWebSocket } from '../../../api/websocke/Websocket.js';
import { useNotification } from '../../../hooks/notifications/UseNotification.js';
import PageLayout from '../../layouts/pages/PageLayout.jsx';
import { useRoomService } from '../../room/services/RoomService.js';
import { useUserService } from '../../user/service/UserService.js';
import { useChatRoomService } from '../services/ChatMessageService.js';

const ChatPage = () => {
  const {
    connectWithMessageAndNotification,
    unsubscribeFromMessages,
    sendMessage,
  } = useWebSocket();

  const { getChatMessageByRoomId } = useChatRoomService();
  const { getRoom } = useRoomService();
  const { getUserById } = useUserService();

  const { notifyError } = useNotification();

  const { roomId, userId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = React.useState();
  const [room, setRoom] = React.useState();
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const chatContentRef = React.useRef(null);

  const handleSendMessage = React.useCallback(
    (event) => {
      event.preventDefault();
      if (message.trim() !== '') {
        const chatMessage = {
          roomId: room.id,
          sender: user,
          content: message,
        };
        sendMessage(room.id, chatMessage);
        setMessage('');
      }
    },
    [message, room, sendMessage, user],
  );

  const findMessages = React.useCallback(
    (pRoomId) => {
      getChatMessageByRoomId(pRoomId)
        .then((list) => setMessages(list))
        .catch((error) => {
          console.log('Error ao buscar mensagens');
          notifyError(
            error.response?.data?.detail ?? error.response?.data?.title,
          );
        });
    },
    [getChatMessageByRoomId, notifyError],
  );

  const findData = React.useCallback(
    async (roomId, userId) => {
      try {
        const [roomData, userData] = await Promise.all([
          getRoom(roomId),
          getUserById(userId),
        ]);

        setRoom(roomData);
        setUser(userData);
      } catch (error) {
        notifyError(
          error.response?.data?.detail ?? error.response?.data?.title,
        );

        navigate('/');
      }
    },
    [getRoom, getUserById, navigate, notifyError],
  );

  React.useEffect(() => {
    if (roomId && userId) {
      findMessages(roomId);
      findData(roomId, userId);

      connectWithMessageAndNotification(setMessages, roomId, userId);
    }

    return () => unsubscribeFromMessages();
  }, [
    connectWithMessageAndNotification,
    findData,
    findMessages,
    roomId,
    unsubscribeFromMessages,
    userId,
  ]);

  React.useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    user && (
      <PageLayout user={user} setUser={setUser}>
        <ChatWrapper>
          <ChatHeader>Sala: {room?.roomName}</ChatHeader>
          <ChatContent ref={chatContentRef}>
            {messages.map((msg, index) => (
              <MessageItem key={index} isMyUser={msg.sender.id === user.id}>
                <MessageContent>
                  <div>
                    <strong>{msg.sender.username}</strong>
                    {' - '}
                    {format(new Date(msg.creationInstant), 'EEEE kk:mm', {
                      locale: ptBR,
                    })}
                  </div>
                  {msg.content}
                </MessageContent>
              </MessageItem>
            ))}
          </ChatContent>
          <ChatForm onSubmit={handleSendMessage}>
            <TextAreaChat
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              onKey
              placeholder="Digite sua mensagem"
              rows={3}
            />
            <SendButton type="submit">Enviar</SendButton>
          </ChatForm>
        </ChatWrapper>
      </PageLayout>
    )
  );
};

export default ChatPage;
