import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-color: #171831;
  color: white;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 15px 0 15px;
  background-color: #1f2044;
`;

export const Title = styled.h1`
  font-size: 24px;
`;

export const ChangeUserButtom = styled.button`
  margin: 10px 0;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    color: #1f2044;
  }
`;

export const ChatNotificationContent = styled.div`
  display: flex;
  flex-direction: column;
`;
