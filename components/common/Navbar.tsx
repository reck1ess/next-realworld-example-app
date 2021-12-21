import styled from "@emotion/styled";
import React from "react";
import useSWR from "swr";

import CustomLink from "./CustomLink";
import Maybe from "./Maybe";
import NavLink from "./NavLink";
import { usePageDispatch } from "lib/context/PageContext";
import checkLogin from "lib/utils/checkLogin";
import storage from "lib/utils/storage";

const NavbarContainer = styled("nav")`
  position: relative;
  padding: 0.5rem 1rem;

  &::after {
    content: "";
    display: table;
    clear: both;
  }

  @media (min-width: 544px) {
    border-radius: 0.25rem;
  }
`;

const NavbarPresenter = styled("div")`
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: 544px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 940px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const Logo = styled(CustomLink)`
  float: left;
  font-family: titillium web, sans-serif !important;
  font-size: 1.5rem !important;
  margin-right: 2rem !important;
  padding-top: 0 !important;
  padding-bottom: 0.25rem;
  color: #5cb85c !important;
`;

const NavbarList = styled("ul")`
  float: right !important;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`;

const NavbarItem = styled("li")`
  float: left;

  & + & {
    margin-left: 1rem;
  }
`;

const Navbar = () => {
  const setPage = usePageDispatch();
  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  const handleClick = React.useCallback(() => setPage(0), []);

  return (
    <NavbarContainer>
      <NavbarPresenter>
        <Logo href="/" as="/" onClick={handleClick}>
          conduit
        </Logo>
        <NavbarList>
          <NavbarItem>
            <NavLink href="/" as="/" onClick={handleClick}>
              Home
            </NavLink>
          </NavbarItem>
          <Maybe test={isLoggedIn}>
            <NavbarItem>
              <NavLink href="/editor/new" as="/editor/new">
                <i className="ion-compose" />
                &nbsp;New Post
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink href="/user/settings" as="/user/settings">
                <i className="ion-gear-a" />
                &nbsp;Settings
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                href={`/profile/${currentUser?.username}`}
                as={`/profile/${currentUser?.username}`}
                onClick={handleClick}
              >
                {currentUser?.username}
              </NavLink>
            </NavbarItem>
          </Maybe>
          <Maybe test={!isLoggedIn}>
            <NavbarItem>
              <NavLink href="/user/login" as="/user/login">
                Sign in
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink href="/user/register" as="/user/register">
                Sign up
              </NavLink>
            </NavbarItem>
          </Maybe>
        </NavbarList>
      </NavbarPresenter>
    </NavbarContainer>
  );
};

export default Navbar;
