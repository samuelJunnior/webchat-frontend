import React from 'react';
import axios from '../../../api/axios/AxiosConfig';

export const mapSortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
};

export function useRoomService() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [sortDirection, setSortDirection] = React.useState(
    mapSortDirection.ASC,
  );
  const [sortField, setSortField] = React.useState('roomName');
  const [pageSize, setPageSize] = React.useState(8);

  const handlePageSize = React.useCallback((ps) => {
    setPageSize(ps.target.value);
  }, []);

  const handleNextPage = React.useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]);

  const handlePreviousPage = React.useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const handleSortField = React.useCallback((sortField) => {
    setSortField(sortField);
  }, []);

  const handleSortDirection = React.useCallback((sortDirection) => {
    setSortDirection(sortDirection.target.value);
  }, []);

  const getRooms = React.useCallback(() => {
    return axios
      .get(
        `/v1/room?pageNumber=${currentPage}&pageSize=${pageSize}&sortField=${sortField}&sortDirecton=${sortDirection}`,
      )
      .then(({ data }) => {
        setTotalPages(data.totalPages);
        return data.elements;
      })
      .catch((error) => {
        throw error;
      });
  }, [currentPage, sortDirection, sortField, pageSize]);

  const newRoom = React.useCallback((payload) => {
    return axios.post('/v1/room', payload).catch((error) => {
      throw error;
    });
  }, []);

  const deleteRoom = React.useCallback((idRoom) => {
    return axios.delete(`/v1/room/${idRoom}`).catch((error) => {
      throw error;
    });
  }, []);

  const getRoom = React.useCallback((idRoom) => {
    return axios
      .get(`/v1/room/${idRoom}`)
      .then(({ data }) => {
        return data;
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return {
    currentPage,
    totalPages,
    sortDirection,
    sortField,
    pageSize,
    getRoom,
    getRooms,
    newRoom,
    deleteRoom,
    handleNextPage,
    handlePreviousPage,
    handleSortField,
    handleSortDirection,
    handlePageSize,
  };
}
