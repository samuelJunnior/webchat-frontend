import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 95%;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    color: #1f2044;
  }
`;

export const ChatWrapper = styled.div`
  margin: 20px;
  overflow-y: hidden;
  border: 1px solid white;
  border-radius: 4px;
  height: 100%;
`;

export const ChatHeader = styled.h3`
  text-align: center;
  background-color: #1f2044;
  margin: 0;
  padding: 10px;
  border-bottom: 1px solid gray;
`;

export const ChatContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 75%;
  overflow-y: scroll;
`;

export const ChatForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid gray;
`;

export const TextAreaChat = styled.textarea`
  width: 90%;
  resize: none;
  border-radius: 10px;
  padding: 10px;
`;

export const SendButton = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    color: #1f2044;
  }
`;

export const MessageItem = styled.div`
  display: flex;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 8px;
  justify-content: ${(props) => (props.isMyUser ? 'end' : 'start')};
`;

export const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #1f2044;
  padding: 10px;
  border-radius: 8px;
`;
