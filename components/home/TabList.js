import React from "react";
import { useRouter } from "next/router";

import NavLink from "../common/NavLink";
import CustomLink from "../common/CustomLink";
import Maybe from "../common/Maybe";
import useIsMounted from "../../lib/hooks/useIsMounted";

const TabList = () => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const {
    query: { tab, tag }
  } = router;

  const currentUser = isMounted && window.localStorage.getItem(`user`);

  if (
    !currentUser ||
    (currentUser.constructor === Object &&
      Object.entries(currentUser).length === 0)
  ) {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink href="?tab=all">Global Feed</NavLink>
        </li>

        <Maybe test={!!tag}>
          <li className="nav-item">
            <CustomLink href="/" className="nav-link active">
              <i className="ion-pound" /> {tag}
            </CustomLink>
          </li>
        </Maybe>
      </ul>
    );
  }

  return (
    <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <NavLink href="?tab=feed">Your Feed</NavLink>
      </li>

      <li className="nav-item">
        <NavLink href="?tab=all">Global Feed</NavLink>
      </li>

      <Maybe test={!!tag}>
        <li className="nav-item">
          <CustomLink href="/" className="nav-link active">
            <i className="ion-pound" /> {tag}
          </CustomLink>
        </li>
      </Maybe>
    </ul>
  );
};

export default TabList;
