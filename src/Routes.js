import { Navigate, Route, Routes } from 'react-router-dom';
import ChatPage from './components/chat/pages/ChatPage';
import RoomPage from './components/room/pages/RoomPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RoomPage />} />
      <Route path="/chat/:roomId/:userId" element={<ChatPage />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
