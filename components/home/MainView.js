import React from "react";

import TabList from "./TabList";
import ArticleList from "../article/ArticleList";

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
