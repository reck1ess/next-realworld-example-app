import React from "react";

import ArticleList from "./ArticleList";
import TabList from "./TabList";

const MainView = ({ articles }) => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <TabList />
      </div>
      <ArticleList initialArticles={articles} />
    </div>
  );
};

export default MainView;
