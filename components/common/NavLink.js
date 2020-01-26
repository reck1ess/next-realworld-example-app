import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ href, children }) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <Link href={href} passHref>
      <a
        className={classnames("nav-link", {
          active: asPath === href
        })}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
