import { useState, memo } from 'react';
import { number, func } from 'prop-types';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';

import Pagination from 'react-bootstrap/Pagination';
import range from 'utils/range';

const PaginationComponent = ({
  defaultPage,
  totalRecords,
  totalPages,
  pageLimit,
  onPageChanged,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);

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
        <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1}>
          <IoMdArrowRoundBack />
        </Pagination.Prev>
        {renderController()}
        <Pagination.Next
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <IoMdArrowRoundForward />
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

PaginationComponent.propTypes = {
  defaultPage: number.isRequired,
  pageLimit: number.isRequired,
  totalRecords: number.isRequired,
  totalPages: number.isRequired,
  onPageChanged: func.isRequired,
};

export default memo(PaginationComponent);
