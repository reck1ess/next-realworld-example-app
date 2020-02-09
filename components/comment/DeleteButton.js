import { useRouter } from "next/router";
import useSWR from "swr";
import marked from "marked";
import fetch from "isomorphic-unfetch";

import ArticleMeta from "../../components/article/ArticleMeta";
import RedError from "../../components/common/RedError";
import fetcher from "../../lib/utils/fetcher";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const DeleteButton = ({ commentId }) => {
  const router = useRouter();
  const {
    query: { pid }
  } = router;

  const handleDelete = async commentId => {
    const { error } = useSWR(
      `${SERVER_BASE_URL}/articles/${pid}/comments/${commentId}`,
      url =>
        fetch(url, {
          method: "DELETE"
        })
    );
  };

  return (
    <span className="mod-options">
      <i className="ion-trash-a" onClick={() => handleDelete(commentId)} />
    </span>
  );
};

export default DeleteButton;
