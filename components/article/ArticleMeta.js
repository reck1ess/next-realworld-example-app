import React from "react";

import CustomLink from "../common/CustomLink";
import ArticleActions from "./ArticleActions";

const ArticleMeta = ({ article }) => {
  if (!article) return;

  return (
    <div className="article-meta">
      <CustomLink href={`/@${article.author.username}`}>
        <img src={article.author.image} alt="author-profile-image" />
      </CustomLink>

      <div className="info">
        <CustomLink href={`/@${article.author.username}`} className="author">
          {article.author.username}
        </CustomLink>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      <ArticleActions article={article} />
    </div>
  );
};

export default ArticleMeta;
