import styles from "./customOption.module.scss";
import { OptionProps } from "react-select";
import { Option } from "@/components/ui/input-group/input-group-models";

export function MdCustomOption(props: OptionProps<Option, true>) {
    return (
        <div className={styles.option} ref={props.innerRef} {...props.innerProps}>
            {props.data.label}
        </div>
    );
}
