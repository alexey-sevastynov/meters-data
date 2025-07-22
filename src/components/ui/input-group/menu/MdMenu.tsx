import styles from "./menu.module.scss";
import { MenuProps } from "react-select";
import { Option } from "@/components/ui/input-group/input-group-models";

export function MdMenu(props: MenuProps<Option, true>) {
    return (
        <div className={styles.menu} ref={props.innerRef} {...props.innerProps}>
            {props.children}
        </div>
    );
}
