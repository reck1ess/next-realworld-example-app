import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

import NavLink from "../common/NavLink";
import CustomLink from "../common/CustomLink";
import Maybe from "../common/Maybe";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";

const TabList = () => {
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);
  const router = useRouter();
  const {
    query: { tag }
  } = router;

  if (!isLoggedIn) {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <NavLink href="/">Global Feed</NavLink>
        </li>

        <Maybe test={!!tag}>
          <li className="nav-item">
            <CustomLink href={`/?tag=${tag}`} className="nav-link active">
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
        <NavLink href={`/?author=${currentUser.username}`}>Your Feed</NavLink>
      </li>

      <li className="nav-item">
        <NavLink href="/">Global Feed</NavLink>
      </li>

      <Maybe test={!!tag}>
        <li className="nav-item">
          <CustomLink href={`/?tag=${tag}`} className="nav-link active">
            <i className="ion-pound" /> {tag}
          </CustomLink>
        </li>
      </Maybe>
    </ul>
  );
};

export default TabList;
