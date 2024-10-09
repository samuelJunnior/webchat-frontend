import React from 'react';
import axios from '../../../api/axios/AxiosConfig';

export function useUserService() {
  const getUserByEmail = React.useCallback((email) => {
    return axios
      .get(`/v1/user/email/${email}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const getUserById = React.useCallback((id) => {
    return axios
      .get(`/v1/user/${id}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const createUser = React.useCallback((payload) => {
    return axios
      .post('/v1/user', payload)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return {
    getUserById,
    getUserByEmail,
    createUser,
  };
}
