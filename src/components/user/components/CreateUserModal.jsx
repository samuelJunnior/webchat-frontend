// src/components/CreateRoomModal.js
import React from 'react';
import Modal from 'react-responsive-modal';

import { Button, Input, ModalContent } from '../../chat/ChatStyled.js';
import { useUserService } from '../service/UserService.js';
import { useMediaQueryValues } from '../../room/RoomStyled.js';
import { useNotification } from '../../../hooks/notifications/UseNotification.js';

const CreateUserModal = ({ isOpen, onClose, emailCreate, setEmailCreate }) => {
  const [inputName, setInputName] = React.useState();

  const { createUser } = useUserService();
  const { notifySuccess, notifyError } = useNotification();

  const { isTabletOrMobile } = useMediaQueryValues();

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      createUser({ username: inputName, email: emailCreate })
        .then(({ data }) => {
          onClose();
          notifySuccess('Usuário cadastrado com sucesso!');
          setEmailCreate();
        })
        .catch((error) => {
          console.log('Erro ao salvar usuário.');
          notifyError(error.response.data.detail ?? error.response.data.title);
        });
    },
    [
      createUser,
      emailCreate,
      inputName,
      notifyError,
      notifySuccess,
      onClose,
      setEmailCreate,
    ],
  );

  const customStyles = {
    content: {
      width: isTabletOrMobile ? '320px' : '500px',
      height: '250px',
      padding: '20px',
      backgroundColor: '#6968d4',
      color: 'white',
    },
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      styles={{
        modal: customStyles.content,
      }}
    >
      <ModalContent>
        <h3>Cadastrar Usuário</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Nome"
            required
            onChange={(v) => {
              setInputName(v.target.value);
            }}
          />
          <Input
            type="text"
            placeholder="E-mail"
            value={emailCreate}
            required
            onChange={(v) => {
              setEmailCreate(v.target.value);
            }}
          />
          <Button type="submit">Criar Usuário</Button>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
