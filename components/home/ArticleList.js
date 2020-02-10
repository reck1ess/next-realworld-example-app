import React from "react";

import ArticlePreview from "./ArticlePreview";
import Pagination from "../common/Pagination";
import LoadingSpinner from "../common/LoadingSpinner";
import PageCountContext from "../../lib/context/PageCountContext";
import PageContext from "../../lib/context/PageContext";
import useViewport from "../../lib/hooks/useViewport";

const ArticleList = ({ loading, articles }) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (articles && articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  const { page, setPage } = React.useContext(PageContext);
  const { pageCount } = React.useContext(PageCountContext);
  const { vw } = useViewport();
  const lastIndex = Math.ceil(pageCount / 20);

  return (
    <div>
      {articles &&
        articles.map(article => (
          <ArticlePreview key={article.slug} article={article} />
        ))}

      <Pagination
        total={pageCount}
        limit={20}
        pageCount={vw >= 768 ? 10 : 5}
        currentPage={page}
      >
        {({ pages, currentPage, hasNextPage, hasPreviousPage }) => (
          <React.Fragment>
            <li
              key={`first-button`}
              className="page-item"
              onClick={e => {
                e.preventDefault();
                setPage(0);
              }}
            >
              <a className="page-link">{`<<`}</a>
            </li>
            {hasPreviousPage && (
              <li
                key={`prev-button`}
                className="page-item"
                onClick={e => {
                  e.preventDefault();
                  setPage(page - 1);
                }}
              >
                <a className="page-link">{`<`}</a>
              </li>
            )}
            {pages.map(page => {
              const isCurrent = page === currentPage;
              const handleClick = e => {
                e.preventDefault();
                setPage(page);
              };
              return (
                <li
                  key={page.toString()}
                  className={isCurrent ? "page-item active" : "page-item"}
                  onClick={handleClick}
                >
                  <a className="page-link">{page + 1}</a>
                </li>
              );
            })}
            {hasNextPage && (
              <li
                key={`next-button`}
                className="page-item"
                onClick={e => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                <a className="page-link">{`>`}</a>
              </li>
            )}
            <li
              key={`last-button`}
              className="page-item"
              onClick={e => {
                e.preventDefault();
                setPage(lastIndex);
              }}
            >
              <a className="page-link">{`>>`}</a>
            </li>
          </React.Fragment>
        )}
      </Pagination>
    </div>
  );
};

export default ArticleList;
