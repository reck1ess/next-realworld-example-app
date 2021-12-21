import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

interface CustomLinkProps {
  href: string;
  as: string;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Anchor = styled("a")`
  text-decoration: none !important;
`;

const CustomLink = ({
  className,
  href,
  as,
  onClick,
  children,
}: CustomLinkProps) => (
  <Link href={href} as={as} passHref onClick={onClick}>
    <Anchor className={className || ""}>{children}</Anchor>
  </Link>
);

export default CustomLink;
