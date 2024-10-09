import React from 'react';
import axios from '../../../api/axios/AxiosConfig';

export function useChatRoomService() {
  const getChatMessageByRoomId = React.useCallback((roomId) => {
    return axios
      .get(`/v1/chat-message/${roomId}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return { getChatMessageByRoomId };
}
