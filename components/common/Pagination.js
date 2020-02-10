import React from "react";

import { getRange, getPageInfo } from "../../lib/utils/calculatePagination";

const Pagination = ({ children, total, limit, pageCount, currentPage }) => {
  const [page, setPage] = React.useState(0);

  if (currentPage && page !== currentPage) {
    setPage(currentPage);
  }

  const {
    firstPage,
    lastPage,
    previousPage,
    nextPage,
    hasPreviousPage,
    hasNextPage,
    totalPages
  } = getPageInfo({
    limit,
    pageCount,
    total,
    page: currentPage
  });

  const pages = total > 0 ? getRange(firstPage, lastPage) : [];

  return (
    <nav>
      <ul className="pagination">
        {children({
          currentPage,
          pages,
          previousPage,
          nextPage,
          hasPreviousPage,
          hasNextPage,
          totalPages
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
