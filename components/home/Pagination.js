import React from "react";

const Pagination = ({ totalPagesCount, currentPage, onSetPage }) => {
  if (totalPagesCount < 2) {
    return null;
  }
  const range = [];
  for (let i = 0; i < totalPagesCount; ++i) {
    range.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {range.map(v => {
          const isCurrent = v === currentPage;
          const handleClick = e => {
            e.preventDefault();
            onSetPage(v);
          };
          return (
            <li
              key={v.toString()}
              className={isCurrent ? "page-item active" : "page-item"}
              onClick={handleClick}
            >
              <a className="page-link" href="/">
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Pagination;
