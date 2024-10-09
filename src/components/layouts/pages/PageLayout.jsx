import React from 'react';
import CreateUserModal from '../../user/components/CreateUserModal';
import FindUserModal from '../../user/components/FindUserModal';
import { ChangeUserButtom, Container, Header, Title } from '../LayoutStyled';

const PageLayout = ({ children, user, setUser }) => {
  const [emailCreate, setEmailCreate] = React.useState();
  const [showFindUserModal, setShowFindUserModal] = React.useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = React.useState(false);

  React.useEffect(() => {
    if (!user) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setShowFindUserModal(true);
      }
    }
  }, [setUser, user]);

  React.useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <Container>
      {user && (
        <Header>
          <Title>{`Olá, ${user?.username}!`}</Title>
          <ChangeUserButtom
            onClick={() => {
              setUser();
              setShowFindUserModal(true);
              localStorage.removeItem('user');
            }}
          >
            Trocar Usuário
          </ChangeUserButtom>
        </Header>
      )}

      {children}

      <FindUserModal
        isOpen={showFindUserModal}
        onClose={() => setShowFindUserModal(false)}
        setUser={setUser}
        setShowCreateUserModal={setShowCreateUserModal}
        setEmailCreate={setEmailCreate}
      />

      <CreateUserModal
        isOpen={showCreateUserModal}
        onClose={() => {
          setShowCreateUserModal(false);
          setShowFindUserModal(true);
        }}
        emailCreate={emailCreate}
        setEmailCreate={setEmailCreate}
      />
    </Container>
  );
};

export default PageLayout;
