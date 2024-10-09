import React from 'react';
import Pagination from './Pagination.jsx';
import RoomItem from './RoomItem.jsx';
import { RommListHeader, RoomButton } from '../RoomStyled.js';

const RoomList = ({
  rooms,
  userId,
  fetchRooms,
  currentPage,
  totalPages,
  sortDirection,
  pageSize,
  setShowCreateRoom,
  handleNextPage,
  handlePreviousPage,
  handleSortDirection,
  handlePageSize,
}) => {
  return (
    <React.Fragment>
      <RommListHeader>
        <h3>Salas</h3>
        <RoomButton bgcolor={'#6968d4'} onClick={() => setShowCreateRoom(true)}>
          Cadastra Sala
        </RoomButton>
      </RommListHeader>

      {rooms.length === 0 ? (
        <span>Sem salas cadastradas</span>
      ) : (
        rooms.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            userId={userId}
            fetchRooms={fetchRooms}
          />
        ))
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        sortDirection={sortDirection}
        pageSize={pageSize}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handleSortDirection={handleSortDirection}
        handlePageSize={handlePageSize}
      />
    </React.Fragment>
  );
};

export default RoomList;
