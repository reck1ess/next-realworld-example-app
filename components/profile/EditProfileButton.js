import React from "react";

import Maybe from "../common/Maybe";
import CustomLink from "../common/CustomLink";

const EditProfileButton = ({ isUser }) => (
  <Maybe test={isUser}>
    <CustomLink
      href="/settings"
      className="btn btn-sm btn-outline-secondary action-btn"
    >
      <i className="ion-gear-a" /> Edit Profile Settings
    </CustomLink>
  </Maybe>
);

export default EditProfileButton;
