import Styles from "./linkButtonGroup.module.scss";
import { Link } from "react-router-dom";
import { MdButton } from "@/components/ui/button/MdButton";
import { LinkButtonGroupProps } from "./linkButtonGroup.interface";

export function LinkButtonGroup({
  linksGroup,
  className,
}: LinkButtonGroupProps) {
  return (
    <div className={`${Styles.linkButtonGroup} ${className}`}>
      {linksGroup.map((link, index) => (
        <Link
          key={index}
          to={link.path}
        >
          <MdButton icon={link.icon}>{link.label}</MdButton>
        </Link>
      ))}
    </div>
  );
}
