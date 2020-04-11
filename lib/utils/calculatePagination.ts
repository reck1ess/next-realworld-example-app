export const getRange = (start, end) => {
  return [...Array(end - start + 1)].map((_, i) => start + i);
};

export const getPageInfo = ({ limit, pageCount, total, page }) => {
  const totalPages = Math.floor(total / limit);

  let currentPage = page;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let firstPage = Math.max(0, currentPage - Math.floor(pageCount / 2));
  let lastPage = Math.min(totalPages, currentPage + Math.floor(pageCount / 2));

  if (lastPage - firstPage + 1 < pageCount) {
    if (currentPage < totalPages / 2) {
      lastPage = Math.min(
        totalPages,
        lastPage + (pageCount - (lastPage - firstPage))
      );
    } else {
      firstPage = Math.max(1, firstPage - (pageCount - (lastPage - firstPage)));
    }
  }

  if (lastPage - firstPage + 1 > pageCount) {
    if (currentPage > totalPages / 2) {
      firstPage = firstPage + 1;
    } else {
      lastPage = lastPage - 1;
    }
  }

  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPreviousPage = currentPage > 0;
  const hasNextPage = currentPage < totalPages;

  return {
    firstPage,
    lastPage,
    previousPage,
    nextPage,
    hasPreviousPage,
    hasNextPage,
    totalPages,
  };
};
