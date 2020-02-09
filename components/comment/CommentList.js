import React from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import RedError from "../../components/common/RedError";
import fetcher from "../../lib/utils/fetcher";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

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
      <RedError message="Cannot load comments related to this article..." />
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
