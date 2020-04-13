import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import ArticlePreview from "./ArticlePreview";
import ErrorMessage from "../common/ErrorMessage";
import LoadingSpinner from "../common/LoadingSpinner";
import Maybe from "../common/Maybe";
import Pagination from "../common/Pagination";
import { usePageState } from "../../lib/context/PageContext";
import {
  usePageCountState,
  usePageCountDispatch,
} from "../../lib/context/PageCountContext";
import useViewport from "../../lib/hooks/useViewport";
import { SERVER_BASE_URL, DEFAULT_LIMIT } from "../../lib/utils/constant";
import fetcher from "../../lib/utils/fetcher";

const ArticleList = () => {
  const page = usePageState();
  const pageCount = usePageCountState();
  const setPageCount = usePageCountDispatch();
  const lastIndex =
    pageCount > 480 ? Math.ceil(pageCount / 20) : Math.ceil(pageCount / 20) - 1;

  const { vw } = useViewport();
  const router = useRouter();
  const { asPath, pathname, query } = router;
  const { favorite, follow, tag, pid } = query;

  const isProfilePage = pathname.startsWith(`/profile`);

  let fetchURL = `${SERVER_BASE_URL}/articles?offset=${page * DEFAULT_LIMIT}`;

  switch (true) {
    case !!tag:
      fetchURL = `${SERVER_BASE_URL}/articles${asPath}&offset=${
        page * DEFAULT_LIMIT
      }`;
      break;
    case isProfilePage && !!favorite:
      fetchURL = `${SERVER_BASE_URL}/articles?favorited=${encodeURIComponent(
        String(pid)
      )}&offset=${page * DEFAULT_LIMIT}`;
      break;
    case isProfilePage && !favorite:
      fetchURL = `${SERVER_BASE_URL}/articles?author=${encodeURIComponent(
        String(pid)
      )}&offset=${page * DEFAULT_LIMIT}`;
      break;
    case !isProfilePage && !!follow:
      fetchURL = `${SERVER_BASE_URL}/articles/feed?offset=${
        page * DEFAULT_LIMIT
      }`;
      break;
    default:
      break;
  }

  const { data, error } = useSWR(fetchURL, fetcher);

  if (error) {
    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active"></ul>
        </div>
        <ErrorMessage message="Cannot load recent articles..." />
      </div>
    );
  }

  if (!data) return <LoadingSpinner />;

  const { articles, articlesCount } = data;
  setPageCount(articlesCount);

  if (articles && articles.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <>
      {articles?.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}

      <Maybe test={articlesCount && articlesCount > 20}>
        <Pagination
          total={pageCount}
          limit={20}
          pageCount={vw >= 768 ? 10 : 5}
          currentPage={page}
          lastIndex={lastIndex}
          fetchURL={fetchURL}
        />
      </Maybe>
    </>
  );
};

export default ArticleList;
