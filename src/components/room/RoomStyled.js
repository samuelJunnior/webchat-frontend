import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

export const useMediaQueryValues = () => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  return { isTabletOrMobile };
};

export const NewRoomButtom = styled.button`
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

export const WrapperPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 10px;
`;

export const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #6968d4;
  color: white;
  cursor: pointer;
  border-radius: 10px;
`;

export const PaginationSelect = styled.select`
  padding: 5px;
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin-top: 15px;
  gap: 10px;
  border: none;
  border-radius: 8px;
  background-color: #1f2044;
`;

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #6968d4;
  border-radius: 8px;
`;

export const ItemData = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: start;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const RommListHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
`;

export const RoomButton = styled.button`
  height: auto;
  padding: 5px 10px;
  background-color: ${(props) => props.bgcolor};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  min-width: 100px;

  &:hover {
    color: #1f2044;
  }
`;
