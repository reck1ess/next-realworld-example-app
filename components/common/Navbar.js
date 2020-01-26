import React from "react";

import CustomLink from "./CustomLink";
import useIsMounted from "../../lib/hooks/useIsMounted";
import Maybe from "./Maybe";

const Navbar = () => {
  const isMounted = useIsMounted();
  const currentUser = isMounted && window.localStorage.getItem(`user`);
  const isLoggedIn =
    !!currentUser &&
    currentUser.constructor === Object &&
    Object.keys(currentUser).length !== 0;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <CustomLink className="navbar-brand" href="/">
          conduit
        </CustomLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <CustomLink className="nav-link active" href="/">
              Home
            </CustomLink>
          </li>
          <Maybe test={isLoggedIn}>
            <li className="nav-item">
              <CustomLink className="nav-link" href="/post">
                <i className="ion-compose" />
                &nbsp;New Post
              </CustomLink>
            </li>
            <li className="nav-item">
              <CustomLink className="nav-link" href="/setting">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </CustomLink>
            </li>
            <li className="nav-item">
              <CustomLink className="nav-link" href="/profile">
                {currentUser && currentUser.username}
              </CustomLink>
            </li>
          </Maybe>
          <Maybe test={!isLoggedIn}>
            <li className="nav-item">
              <CustomLink className="nav-link" href="/login">
                Sign in
              </CustomLink>
            </li>
            <li className="nav-item">
              <CustomLink className="nav-link" href="/register">
                Sign up
              </CustomLink>
            </li>
          </Maybe>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
