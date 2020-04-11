import Link from "next/link";
import { useRouter } from "next/router";

interface NavLinkProps {
  href: string;
  as: string;
  children: React.ReactNode;
}

const NavLink = ({ href, as, children }: NavLinkProps) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <Link href={href} as={as} passHref>
      <a
        className={`nav-link ${
          encodeURIComponent(asPath) === encodeURIComponent(as) && `active`
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
