import React from "react";

import CustomLink from "../common/CustomLink";
import Maybe from "../common/Maybe";

const EditProfileButton = ({ isUser }) => (
  <Maybe test={isUser}>
    <CustomLink
      href="/user/settings"
      className="btn btn-sm btn-outline-secondary action-btn"
    >
      <i className="ion-gear-a" /> Edit Profile Settings
    </CustomLink>
  </Maybe>
);

export default EditProfileButton;
