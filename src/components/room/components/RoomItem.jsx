import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../../hooks/notifications/UseNotification.js';
import {
  ButtonsContainer,
  ItemContainer,
  ItemData,
  RoomButton,
} from '../RoomStyled.js';
import { useRoomService } from '../services/RoomService.js';

const RoomItem = ({ room, userId, fetchRooms }) => {
  const { deleteRoom } = useRoomService();

  const { notifySuccess, notifyError } = useNotification();

  const navigate = useNavigate();

  return (
    <ItemContainer>
      <ItemData>
        <span>
          <strong>Nome:</strong> {room.roomName}
        </span>
        <span>
          <strong>Criado por:</strong> {room.owner.username}
        </span>
        <span>
          <strong>Criado em:</strong>{' '}
          {format(new Date(room.creationTimestamp), 'dd/MM/yyyy', {
            locale: ptBR,
          })}
        </span>
      </ItemData>

      <ButtonsContainer>
        <RoomButton
          bgcolor={'#6968d4'}
          onClick={() => {
            navigate(`/chat/${room.id}/${userId}`);
          }}
        >
          Abrir Chat
        </RoomButton>

        <RoomButton
          bgcolor={'red'}
          onClick={() => {
            deleteRoom(room.id)
              .then(() => {
                fetchRooms();
                notifySuccess('Sala excluída com sucesso!');
              })
              .catch((error) => {
                notifyError(
                  error.response.data.detail ?? error.response.data.title,
                );
              });
          }}
        >
          Deletar
        </RoomButton>
      </ButtonsContainer>
    </ItemContainer>
  );
};

export default RoomItem;
