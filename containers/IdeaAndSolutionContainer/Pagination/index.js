import { useState, memo } from 'react';
import { number, func } from 'prop-types';

import Pagination from 'react-bootstrap/Pagination';
import range from 'utils/range';

const PaginationComponent = ({
  totalRecords,
  totalPages,
  pageLimit,
  onPageChanged,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = Math.ceil(totalRecords / pageLimit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChanged(page);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    onPageChanged(nextPage);
  };

  const handlePrevPage = () => {
    const nextPage = currentPage - 1;
    setCurrentPage(nextPage);
    onPageChanged(nextPage);
  };

  const renderController = () => {
    const blockControl = [];
    range(1, pageNumbers).forEach((item) => {
      blockControl.push(
        <Pagination.Item
          key={item}
          active={item === currentPage}
          onClick={() => handlePageChange(item)}
        >
          {item}
        </Pagination.Item>
      );
    });
    return blockControl;
  };
  return (
    <div>
      <Pagination>
        <Pagination.Prev
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        />
        {renderController()}
        <Pagination.Next
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

PaginationComponent.propTypes = {
  pageLimit: number.isRequired,
  totalRecords: number.isRequired,
  totalPages: number.isRequired,
  onPageChanged: func.isRequired,
};

export default memo(PaginationComponent);
