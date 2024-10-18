import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/ui/Button/Button";
import { LinkButtonGroupProps } from "./linkButtonGroup.interface";
import Styles from "./linkButtonGroup.module.scss";

const LinkButtonGroup: React.FC<LinkButtonGroupProps> = ({
  linksGroup,
  className,
}) => {
  return (
    <div className={`${Styles.linkButtonGroup} ${className}`}>
      {linksGroup.map((link, index) => (
        <Link
          key={index}
          to={link.path}
        >
          <Button icon={link.icon}>{link.label}</Button>
        </Link>
      ))}
    </div>
  );
};

export default LinkButtonGroup;
