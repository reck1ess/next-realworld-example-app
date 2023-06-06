import Link from "next/link";
import React from "react";

import { trackButtonClick } from "../../utils/amplitude";

interface CustomLinkProps {
  href: string;
  as: string;
  className?: string;
  children: React.ReactNode;
  onClick?: (event: any) => void;
}

const CustomLink = ({ className, href, as, children, onClick, }: CustomLinkProps) => {
  const handleClick = (event: any) => {
    // Add your analytics tracking code here
    trackButtonClick(as);

    // Call the provided onClick function if it exists
    if (onClick) {
      onClick(event);
    }
  };
 return (
  <Link href={href} as={as} passHref>
    <a className={className || ""}  onClick={handleClick} >{children}</a>
  </Link>
); 
}

export default CustomLink;
