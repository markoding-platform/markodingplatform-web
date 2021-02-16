import { useState, memo } from 'react';
import { number, func } from 'prop-types';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ defaultPage, totalPages, onPageChanged }) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);

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
    const spaceCount = 3;
    const startNumber = defaultPage > spaceCount ? defaultPage - spaceCount : 1;
    const endNumber =
      defaultPage < totalPages - spaceCount
        ? defaultPage + spaceCount
        : totalPages;
    for (let n = startNumber; n <= endNumber; n += 1) {
      blockControl.push(
        <Pagination.Item
          key={n}
          active={n === currentPage}
          onClick={() => handlePageChange(n)}
        >
          {n}
        </Pagination.Item>
      );
    }
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

PaginationComponent.defaultProps = {
  totalPages: 0,
  totalRecords: 0,
  pageLimit: 9,
};

PaginationComponent.propTypes = {
  defaultPage: number.isRequired,
  pageLimit: number,
  totalRecords: number,
  totalPages: number,
  onPageChanged: func.isRequired,
};

export default memo(PaginationComponent);
