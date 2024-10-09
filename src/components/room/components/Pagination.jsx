import {
  PaginationButton,
  PaginationSelect,
  WrapperPagination,
} from '../RoomStyled';
import { mapSortDirection } from '../services/RoomService';

export const Pagination = ({
  currentPage,
  totalPages,
  sortDirection,
  pageSize,
  handlePreviousPage,
  handleNextPage,
  handleSortDirection,
  handlePageSize,
}) => {
  return (
    <WrapperPagination>
      <PaginationButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        {'<<'}
      </PaginationButton>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <PaginationButton
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        {'>>'}
      </PaginationButton>

      <PaginationSelect value={pageSize} onChange={handlePageSize}>
        <option value={1}>{1}</option>
        <option value={5}>{5}</option>
        <option value={8}>{8}</option>
      </PaginationSelect>

      <PaginationSelect value={sortDirection} onChange={handleSortDirection}>
        <option value={mapSortDirection.ASC}>{mapSortDirection.ASC}</option>
        <option value={mapSortDirection.DESC}>{mapSortDirection.DESC}</option>
      </PaginationSelect>
    </WrapperPagination>
  );
};

export default Pagination;
