import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import ArticleList from "./ArticleList";
import fetcher from "../../lib/utils/fetcher";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import ListErrors from "../common/ListErrors";
import TabList from "./TabList";
import useIsMounted from "../../lib/hooks/useIsMounted";

const MainView = ({ articles: initialArticles }) => {
  const [page, setPage] = React.useState(0);
  const isMounted = useIsMounted();

  const router = useRouter();
  const { asPath, query } = router;

  const fetchURL =
    Object.keys(query).length === 0
      ? `${SERVER_BASE_URL}/articles?offset=${page}`
      : `${SERVER_BASE_URL}/articles${asPath}&offset=${page}`;

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

  const articles =
    (fetchedArticles && fetchedArticles.articles) || initialArticles;
  const totalPagesCount = articles.length;

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <TabList />
      </div>
      <ArticleList
        articles={articles}
        loading={isMounted && !fetchedArticles}
        totalPagesCount={totalPagesCount}
        currentPage={page}
        onSetPage={setPage}
      />
    </div>
  );
};

export default MainView;
