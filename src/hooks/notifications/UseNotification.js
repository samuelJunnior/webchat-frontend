import React from 'react';
import { toast } from 'react-toastify';

export const useNotification = () => {
  const notifySuccess = React.useCallback((content) => {
    toast.success(content, {
      position: 'top-center',
      autoClose: 5000,
    });
  }, []);

  const notifyError = React.useCallback((content) => {
    toast.error(content, {
      position: 'top-center',
      autoClose: 5000,
    });
  }, []);

  const notifyInfo = React.useCallback((content) => {
    toast.info(content, {
      position: 'top-center',
      hideProgressBar: true,
      autoClose: 5000,
      icon: false,
    });
  }, []);

  const notifyWarning = React.useCallback((content) => {
    toast.warn(content, {
      position: 'top-center',
      autoClose: 5000,
    });
  }, []);

  return { notifySuccess, notifyError, notifyInfo, notifyWarning };
};
