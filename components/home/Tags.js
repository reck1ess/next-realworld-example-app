import React from "react";

import CustomLink from "../common/CustomLink";
import LoadingSpinner from "../common/LoadingSpinner";
import PageContext from "../../lib/context/PageContext";

const Tags = ({ tags }) => {
  const { setPage } = React.useContext(PageContext);

  if (!tags) return <LoadingSpinner />;

  return (
    <div className="tag-list">
      {tags.map(tag => {
        return (
          <CustomLink
            key={tag}
            href={`/?tag=${tag}`}
            className="tag-default tag-pill"
          >
            <span onClick={() => setPage(0)}>{tag}</span>
          </CustomLink>
        );
      })}
    </div>
  );
};

export default Tags;
