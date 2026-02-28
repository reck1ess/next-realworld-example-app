import styled from "@emotion/styled";
import React from "react";

import ArticleActions from "components/article/ArticleActions";
import CustomImage from "components/common/CustomImage";
import CustomLink from "components/common/CustomLink";

const ArticleMetaContainer = styled("div")`
  display: block;
  position: relative;
  font-weight: 300;
  margin: 2rem 0 0;
`;

const ArticleAuthorImage = styled(CustomImage)`
  display: inline-block;
  vertical-align: middle;
  height: 32px;
  width: 32px;
  border-radius: 30px;
`;

const ArticleInfo = styled("div")`
  display: inline-block;
  vertical-align: middle;
  margin: 0 1.5rem 0 0.3rem;
  line-height: 1rem;
`;

const ArticleAuthorLink = styled(CustomLink)`
  display: block;
  font-weight: 500 !important;
  color: #fff;
`;

const ArticleDate = styled("span")`
  color: #bbb;
  font-size: 0.8rem;
  display: block;
`;

const ArticleMeta = ({ article }) => {
  if (!article) return;

  return (
    <ArticleMetaContainer>
      <CustomLink
        href="/profile/[pid]"
        as={`/profile/${encodeURIComponent(article.author?.username)}`}
      >
        <ArticleAuthorImage
          src={article.author?.image}
          alt="author-profile-image"
        />
      </CustomLink>

      <ArticleInfo>
        <ArticleAuthorLink
          href="/profile/[pid]"
          as={`/profile/${encodeURIComponent(article.author?.username)}`}
        >
          {article.author?.username}
        </ArticleAuthorLink>
        <ArticleDate>{new Date(article.createdAt).toDateString()}</ArticleDate>
      </ArticleInfo>

      <ArticleActions article={article} />
    </ArticleMetaContainer>
  );
};

export default ArticleMeta;
