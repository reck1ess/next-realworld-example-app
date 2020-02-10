export const getRange = (start, end) => {
  return [...Array(end - start + 1)].map((_, i) => start + i);
};

export const getPageInfo = params => {
  const { limit, pageCount, total, page } = params;
  const totalPages = Math.ceil(total / limit);

  const totalResults = total;
  let currentPage = page;

  if (currentPage < 1) {
    currentPage = 1;
  }

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let firstPage = Math.max(1, currentPage - Math.floor(pageCount / 2));
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

  const pages = Math.min(lastPage - firstPage + 1, totalPages);
  const previousPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const firstResult = limit * (currentPage - 1);
  const lastResult = limit * currentPage - 1;
  const results = Math.min(lastResult - firstResult + 1, totalResults);

  return {
    totalPages,
    pages,
    currentPage,
    firstPage,
    lastPage,
    previousPage,
    nextPage,
    hasPreviousPage,
    hasNextPage,
    totalResults,
    results,
    firstResult,
    lastResult
  };
};
