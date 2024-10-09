// src/components/CreateRoomModal.js
import React from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { useNotification } from '../../../hooks/notifications/UseNotification.js';
import { Button, Input, ModalContent } from '../../chat/ChatStyled.js';
import {
  ButtonsContainer,
  useMediaQueryValues,
} from '../../room/RoomStyled.js';
import { useUserService } from '../service/UserService.js';
const FindUserModal = ({
  isOpen,
  onClose,
  setUser,
  setShowCreateUserModal,
  setEmailCreate,
}) => {
  const [inputEmail, setInputEmail] = React.useState();

  const { getUserByEmail } = useUserService();
  const { notifyError, notifyWarning } = useNotification();
  const { isTabletOrMobile } = useMediaQueryValues();

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();

      getUserByEmail(inputEmail)
        .then((data) => {
          setUser(data);
          onClose();
        })
        .catch((error) => {
          if (error?.response.status === 404) {
            notifyWarning('E-mail não cadastrado!');
            return;
          }
          notifyError(error.response.data.detail ?? error.response.data.title);
        });
    },
    [getUserByEmail, inputEmail, notifyError, notifyWarning, onClose, setUser],
  );

  const customStyles = {
    content: {
      width: isTabletOrMobile ? '320px' : '500px',
      height: isTabletOrMobile ? '240px' : '180px',
      backgroundColor: '#6968d4',
      color: 'white',
    },
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      showCloseIcon={false}
      styles={{
        modal: customStyles.content,
      }}
      closeOnOverlayClick={false}
    >
      <ModalContent>
        <h3>Entrar</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="E-mail"
            required
            onChange={(v) => {
              setInputEmail(v.target.value);
            }}
          />

          <ButtonsContainer>
            <Button type="submit">Entrar</Button>
            <Button
              type="button"
              onClick={() => {
                setEmailCreate(inputEmail);
                setShowCreateUserModal(true);
                onClose();
              }}
            >
              Cadastar
            </Button>
          </ButtonsContainer>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default FindUserModal;
