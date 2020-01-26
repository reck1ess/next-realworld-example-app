import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetch from "isomorphic-unfetch";

import { SERVER_BASE_URL } from "../../lib/utils/constant";
import CustomLink from "../common/CustomLink";
import useIsMounted from "../../lib/hooks/useIsMounted";
import api from "../../lib/api";

const CommentInput = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const {
    query: { pid }
  } = router;

  const [content, setContent] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);

  const handleChange = e => {
    setContent(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { ok, data } = await api.Comments.create(pid, content);
    setLoading(false);
    setContent("");

    if (!ok) {
      Toast.info(`Fail to create a comment...`);
    }
  };

  const currentUser = isMounted && window.localStorage.getItem(`user`);

  if (
    !currentUser ||
    (currentUser.constructor === Object &&
      Object.entries(currentUser).length === 0)
  ) {
    return (
      <p>
        <CustomLink href="/login">Sign in</CustomLink>
        &nbsp;or&nbsp;
        <CustomLink href="/register">sign up</CustomLink>
        &nbsp;to add comments on this article.
      </p>
    );
  }

  return (
    <form className="card comment-form" onSubmit={handleSubmit}>
      <div className="card-block">
        <textarea
          rows="3"
          className="form-control"
          placeholder="Write a comment..."
          value={content}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>
      <div className="card-footer">
        <img
          src={currentUser.image}
          className="comment-author-img"
          alt="Comment author's profile image"
        />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentInput;
