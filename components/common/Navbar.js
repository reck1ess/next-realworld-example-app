import React from "react";
import useSWR from "swr";

import CustomLink from "./CustomLink";
import storage from "../../lib/utils/storage";
import Maybe from "./Maybe";
import checkLogin from "../../lib/utils/checkLogin";
import PageContext from "../../lib/context/PageContext";
import NavLink from "./NavLink";

const Navbar = () => {
  const { setPage } = React.useContext(PageContext);
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <CustomLink className="navbar-brand" href="/">
          <span onClick={() => setPage(0)}>conduit</span>
        </CustomLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink href="/">
              <span onClick={() => setPage(0)}>Home</span>
            </NavLink>
          </li>
          <Maybe test={isLoggedIn}>
            <li className="nav-item">
              <NavLink href="/editor/new">
                <i className="ion-compose" />
                &nbsp;New Post
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink href="/user/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink href={`/profile/${currentUser && currentUser.username}`}>
                <span onClick={() => setPage(0)}>
                  {currentUser && currentUser.username}
                </span>
              </NavLink>
            </li>
          </Maybe>
          <Maybe test={!isLoggedIn}>
            <li className="nav-item">
              <NavLink href="/user/login">Sign in</NavLink>
            </li>
            <li className="nav-item">
              <NavLink href="/user/register">Sign up</NavLink>
            </li>
          </Maybe>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
