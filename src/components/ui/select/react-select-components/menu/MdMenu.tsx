import styles from "./menu.module.scss";
import { MenuProps } from "react-select";
import { Option } from "@/components/ui/select/select-models";

export function MdMenu<OptionType = Option, IsMulti extends boolean = false>(
    props: MenuProps<OptionType, IsMulti>,
) {
    return (
        <div className={styles.menu} ref={props.innerRef} {...props.innerProps}>
            {props.children}
        </div>
    );
}
