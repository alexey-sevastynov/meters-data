import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";

interface MdLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string;
    className?: string;
}

export const MdLink = forwardRef<HTMLAnchorElement, MdLinkProps>(
    ({ to, className = "", children, ...props }, ref) => {
        return (
            <RouterLink to={to} className={className} ref={ref} {...props}>
                {children}
            </RouterLink>
        );
    }
);

MdLink.displayName = "MdLink";
