// src/components/CreateRoomModal.js
import React from 'react';
import Modal from 'react-responsive-modal';

import { Button, Input, ModalContent } from '../../chat/ChatStyled.js';

import { useRoomService } from '../services/RoomService.js';
import { useNotification } from '../../../hooks/notifications/UseNotification.js';

const CreateRoomModal = ({ isOpen, onClose, user, fetchRooms }) => {
  const [input, setInput] = React.useState();

  const { newRoom } = useRoomService();
  const { notifySuccess, notifyError } = useNotification();

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      newRoom({ roomName: input, userId: user.id })
        .then(() => {
          fetchRooms();
          onClose();
          notifySuccess('Sucesso ao criar sala!');
        })
        .catch((error) => {
          notifyError(error.response.data.detail ?? error.response.data.title);
        });
    },
    [fetchRooms, input, newRoom, notifyError, notifySuccess, onClose, user.id],
  );

  const customStyles = {
    content: {
      width: '350px',
      height: '200px',
      padding: '20px',
      backgroundColor: '#6968d4',
      color: 'white',
    },
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      styles={{
        modal: customStyles.content,
      }}
      center
    >
      <ModalContent>
        <h3>Cadastrar Sala</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome da sala"
            required
            onChange={(v) => {
              setInput(v.target.value);
            }}
          />
          <Button type="submit">Cadastrar</Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;
