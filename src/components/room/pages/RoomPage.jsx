import React, { Fragment } from 'react';
import { useWebSocket } from '../../../api/websocke/Websocket.js';
import PageLayout from '../../layouts/pages/PageLayout.jsx';
import CreateRoomModal from '../components/CreateRoomModal.jsx';
import RoomList from '../components/RoomList.jsx';
import { WrapperContent } from '../RoomStyled.js';
import { useRoomService } from '../services/RoomService.js';

const RoomPage = () => {
  const [user, setUser] = React.useState();
  const [rooms, setRooms] = React.useState([]);
  const [showCreateRoom, setShowCreateRoom] = React.useState();

  const {
    currentPage,
    totalPages,
    sortDirection,
    pageSize,
    getRooms,
    handleNextPage,
    handlePreviousPage,
    handleSortDirection,
    handlePageSize,
  } = useRoomService();

  const { connectOnlyNotification, disconnect } = useWebSocket();

  const fetchRooms = React.useCallback(() => {
    getRooms().then((data) => {
      setRooms(data);
    });
  }, [getRooms]);

  React.useEffect(() => {
    if (user) {
      connectOnlyNotification(user.id);
      fetchRooms();
    }

    return () => disconnect();
  }, [connectOnlyNotification, disconnect, fetchRooms, user]);

  return (
    <PageLayout user={user} setUser={setUser}>
      {user && (
        <Fragment>
          <WrapperContent>
            <RoomList
              rooms={rooms}
              userId={user.id}
              fetchRooms={fetchRooms}
              currentPage={currentPage}
              totalPages={totalPages}
              sortDirection={sortDirection}
              pageSize={pageSize}
              setShowCreateRoom={setShowCreateRoom}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              handleSortDirection={handleSortDirection}
              handlePageSize={handlePageSize}
            />
          </WrapperContent>

          <CreateRoomModal
            isOpen={showCreateRoom}
            onClose={() => setShowCreateRoom(false)}
            user={user}
            fetchRooms={fetchRooms}
          />
        </Fragment>
      )}
    </PageLayout>
  );
};

export default RoomPage;
