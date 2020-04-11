import React from "react";
import useSWR from "swr";

import CustomLink from "./CustomLink";
import Maybe from "./Maybe";
import NavLink from "./NavLink";
import { usePageDispatch } from "../../lib/context/PageContext";
import checkLogin from "../../lib/utils/checkLogin";
import storage from "../../lib/utils/storage";

const Navbar = () => {
  const setPage = usePageDispatch();
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  const handleClick = React.useCallback(() => setPage(0), []);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <CustomLink className="navbar-brand" href="/" as="/">
          <span onClick={handleClick}>conduit</span>
        </CustomLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink href="/" as="/">
              <span onClick={handleClick}>Home</span>
            </NavLink>
          </li>
          <Maybe test={isLoggedIn}>
            <li className="nav-item">
              <NavLink href="/editor/new" as="/editor/new">
                <i className="ion-compose" />
                &nbsp;New Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink href="/user/settings" as="/user/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                href={`/profile/${currentUser?.username}`}
                as={`/profile/${currentUser?.username}`}
              >
                <span onClick={handleClick}>{currentUser?.username}</span>
              </NavLink>
            </li>
          </Maybe>
          <Maybe test={!isLoggedIn}>
            <li className="nav-item">
              <NavLink href="/user/login" as="/user/login">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink href="/user/register" as="/user/register">
                Sign up
              </NavLink>
            </li>
          </Maybe>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
