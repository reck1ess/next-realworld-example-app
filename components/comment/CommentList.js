import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

import Comment from "./Comment";
import CommentInput from "./CommentInput";
import ErrorMessage from "../../components/common/ErrorMessage";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import fetcher from "../../lib/utils/fetcher";

import { SERVER_BASE_URL } from "../../lib/utils/constant";

const CommentList = () => {
  const router = useRouter();
  const {
    query: { pid }
  } = router;

  const { data: commentData, error: commentError } = useSWR(
    `${SERVER_BASE_URL}/articles/${pid}/comments`,
    fetcher
  );

  if (!commentData) {
    return <LoadingSpinner />;
  }

  if (commentError)
    return (
      <ErrorMessage message="Cannot load comments related to this article..." />
    );

  const { comments } = commentData;

  return (
    <div>
      <CommentInput />
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
