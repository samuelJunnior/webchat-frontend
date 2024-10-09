import { ChatNotificationContent } from '../LayoutStyled';

const ChatNotificationLayout = ({ payload }) => {
  return (
    <ChatNotificationContent>
      <span>Sala: {payload.roomName}</span>
      <span>Eviado por: {payload.sender}</span>
      <h3>{payload.content}</h3>
    </ChatNotificationContent>
  );
};

export default ChatNotificationLayout;
