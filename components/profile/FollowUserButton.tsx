import React from "react";

const FollowUserButton = ({
  isUser,
  following,
  username,
  follow,
  unfollow,
}) => {
  if (isUser) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    following ? unfollow(username) : follow(username);
  };

  return (
    <button
      className={`btn btn-sm action-btn ${
        following ? "btn-secondary" : "btn-outline-secondary"
      }`}
      onClick={handleClick}
    >
      <i className="ion-plus-round" />
      &nbsp;
      {following ? "Unfollow" : "Follow"} {username}
    </button>
  );
};

export default FollowUserButton;
