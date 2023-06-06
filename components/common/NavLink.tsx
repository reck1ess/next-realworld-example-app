import Link from "next/link";
import { useRouter } from "next/router";

import { trackButtonClick } from "../../utils/amplitude";
interface NavLinkProps {
  href: string;
  as: string;
  children: React.ReactNode;
}

const NavLink = ({ href, as, children }: NavLinkProps) => {
  const router = useRouter();
  const { asPath } = router;

  const handleClick = (event: any) => {
    // Add your analytics tracking code here
    trackButtonClick(href);

    // Continue with default navigation behavior
    if (!event.metaKey && !event.ctrlKey && href.startsWith('/')) {
      event.preventDefault();
      router.push(href, as);
    }
  };

  return (
    <Link href={href} as={as} passHref>
      <a
        className={`nav-link ${
          encodeURIComponent(asPath) === encodeURIComponent(as) && `active`
        }`}
        onClick={handleClick}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
