import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Styles from "./link.module.scss";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, className, children, ...props }, ref) => {
    const combinedClassName = `${Styles.link} ${className || ""}`;

    return (
      <RouterLink
        to={to}
        className={combinedClassName}
        ref={ref}
        {...props}
      >
        {children}
      </RouterLink>
    );
  }
);

export default Link;
