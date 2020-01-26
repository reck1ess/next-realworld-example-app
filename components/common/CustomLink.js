import Link from "next/link";

const CustomLink = ({ className, href, children }) => (
  <Link href={href} passHref>
    <a className={className}>{children}</a>
  </Link>
);

export default CustomLink;
