import React from "react";

import ArticleActions from "./ArticleActions";
import CustomImage from "../common/CustomImage";
import CustomLink from "../common/CustomLink";

const ArticleMeta = ({ article }) => {
  if (!article) return;

  return (
    <div className="article-meta">
      <CustomLink
        href="/profile/[pid]"
        as={`/profile/${encodeURIComponent(article.author?.username)}`}
      >
        <CustomImage src={article.author?.image} alt="author-profile-image" />
      </CustomLink>

      <div className="info">
        <CustomLink
          href="/profile/[pid]"
          as={`/profile/${encodeURIComponent(article.author?.username)}`}
          className="author"
        >
          {article.author?.username}
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
