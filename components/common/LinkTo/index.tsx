import React, { FC, MouseEvent, AnchorHTMLAttributes } from "react";
import Link, { LinkProps as NextLinkProps } from "next/link";
import { isExternalLink } from "@/utils/patterns";

export interface Props
  extends NextLinkProps,
    Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "target"> {
  openInNewTab?: boolean;
  title?: string;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  children?: React.ReactNode;
}

const LinkTo: FC<Props> = ({
  href,
  title,
  target,
  onClick,
  className,
  children,
  ...restProps
}) => {
  const openInNewTab = target === "_blank";
  const isExternal = isExternalLink(href);
  const rel = openInNewTab ? "noreferrer noopener" : undefined;

  const handleClick = (e: MouseEvent) => {
    if (onClick) {
      onClick(e);
    }
  };

  if (isExternal || openInNewTab) {
    return (
      <Link
        className={className}
        href={href as string}
        title={title}
        target={target}
        rel={rel}
        onClick={handleClick}>
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} {...restProps}>
      <div className={className} onClick={handleClick}>
        {children}
      </div>
    </Link>
  );
};

export default LinkTo;
