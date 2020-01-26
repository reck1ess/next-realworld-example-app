import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import ArticleList from "./ArticleList";
import fetcher from "../../lib/utils/fetcher";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import LoadingSpinner from "../common/LoadingSpinner";
import ListErrors from "../common/ListErrors";
import TabList from "./TabList";

const MainView = () => {
  const [page, setPage] = React.useState(0);
  const router = useRouter();
  const {
    query: { tab, tag }
  } = router;

  const { data: articleData, error: articleError } = useSWR(
    tab
      ? `${SERVER_BASE_URL}/articles/${tab}`
      : `${SERVER_BASE_URL}/articles?offset=${page}`,
    fetcher
  );

  if (!articleData) {
    return (
      <div className="col-md-9">
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active"></ul>
        </div>
        <LoadingSpinner />
      </div>
    );
  }

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

  const { articles } = articleData;
  const totalPagesCount = articles.length;

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <TabList />
      </div>
      <ArticleList
        articles={articleData && articleData.articles}
        loading={!articleData}
        totalPagesCount={totalPagesCount}
        currentPage={page}
        onSetPage={setPage}
      />
    </div>
  );
};

export default MainView;
