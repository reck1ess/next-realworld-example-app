import { useRouter } from "next/router";
import React from "react";
import useSWR, { trigger } from "swr";

import ArticlePreview from "./ArticlePreview";
import ListErrors from "../common/ListErrors";
import LoadingSpinner from "../common/LoadingSpinner";
import Maybe from "../common/Maybe";
import Pagination from "../common/Pagination";
import PageContext from "../../lib/context/PageContext";
import PageCountContext from "../../lib/context/PageCountContext";
import useIsMounted from "../../lib/hooks/useIsMounted";
import useViewport from "../../lib/hooks/useViewport";
import { SERVER_BASE_URL, DEFAULT_LIMIT } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";

const ArticleList = ({ initialArticles }) => {
  const { page, setPage } = React.useContext(PageContext);
  const { pageCount, setPageCount } = React.useContext(PageCountContext);
  const lastIndex =
    pageCount > 480 ? Math.ceil(pageCount / 20) : Math.ceil(pageCount / 20) - 1;

  const isMounted = useIsMounted();
  const { vw } = useViewport();

  const router = useRouter();
  const { asPath, pathname, query } = router;
  const { favorite, follow, tag, pid } = query;

  const isProfilePage = pathname.startsWith(`/profile`);

  let fetchURL = `${SERVER_BASE_URL}/articles?offset=${page * DEFAULT_LIMIT}`;

  switch (true) {
    case !!tag:
      fetchURL = `${SERVER_BASE_URL}/articles${asPath}&offset=${page *
        DEFAULT_LIMIT}`;
      break;
    case isProfilePage && !!favorite:
      fetchURL = `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
        pid
      )}&offset=${page * DEFAULT_LIMIT}`;
      break;
    case isProfilePage && !favorite:
      fetchURL = `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(
        pid
      )}&offset=${page * DEFAULT_LIMIT}`;
      break;
    case !isProfilePage && !!follow:
      fetchURL = `${SERVER_BASE_URL}/articles/feed?offset=${page *
        DEFAULT_LIMIT}`;
      break;
    default:
      break;
  }

  const { data: fetchedArticles, error: articleError } = useSWR(
    fetchURL,
    fetcher
  );

  if (articleError) {
    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active"></ul>
        </div>
        <ListErrors errors={articleError} />
      </div>
    );
  }

  if (isMounted && !fetchedArticles) {
    return <LoadingSpinner />;
  }

  const { articles, articlesCount } = fetchedArticles || initialArticles;

  setPageCount(articlesCount);

  if (articles && articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <div>
      {articles &&
        articles.map(article => (
          <ArticlePreview key={article.slug} article={article} />
        ))}

      <Maybe test={articlesCount && articlesCount > 20}>
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
                  trigger(fetchURL);
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
                    trigger(fetchURL);
                  }}
                >
                  <a className="page-link">{`<`}</a>
                </li>
              )}
              {pages.map(page => {
                const isCurrent = !currentPage
                  ? page === 0
                  : page === currentPage;

                const handleClick = e => {
                  e.preventDefault();
                  setPage(page);
                  trigger(fetchURL);
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
                    trigger(fetchURL);
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
                  trigger(fetchURL);
                }}
              >
                <a className="page-link">{`>>`}</a>
              </li>
            </React.Fragment>
          )}
        </Pagination>
      </Maybe>
    </div>
  );
};

export default ArticleList;
