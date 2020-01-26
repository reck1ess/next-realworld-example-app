import { Toast } from "antd-mobile";
import React from "react";
import Router, { useRouter } from "next/router";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

import { SERVER_BASE_URL } from "../../lib/utils/constant";
import CustomLink from "../common/CustomLink";
import useIsMounted from "../../lib/hooks/useIsMounted";

const ArticleActions = ({ article }) => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const {
    asPath,
    query: { pid }
  } = router;

  const handleDelete = async () => {
    const user = window.localStorage.getItem(`user`);
    if (!user || Object.keys(user).length === 0) return;

    const { error } = await useSWR(`${SERVER_BASE_URL}/articles/${pid}`, url =>
      fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${user.jwt}`
        }
      })
    );
    if (error) {
      const {
        errors: { body: errorText }
      } = error;
      Toast.info(`${errorText[0]}`, 1.5);
      Router.replace(asPath, asPath, { shallow: true });
    }

    Router.push(`/`);
  };

  const currentUser = isMounted && window.localStorage.getItem(`user`);

  const canModify =
    currentUser && currentUser.username === article.author.username;

  return !canModify ? (
    <span />
  ) : (
    <span>
      <CustomLink
        href={`/editor/${article.slug}`}
        className="btn btn-outline-secondary btn-sm"
      >
        <i className="ion-edit" /> Edit Article
      </CustomLink>

      <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>
        <i className="ion-trash-a" /> Delete Article
      </button>
    </span>
  );
};

export default ArticleActions;
