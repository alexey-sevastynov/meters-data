import styles from "./customOption.module.scss";
import { OptionProps } from "react-select";
import { Option } from "@/components/ui/select/select-models";

export function MdCustomOption<IsMulti extends boolean = false>(props: OptionProps<Option, IsMulti>) {
    return (
        <div className={styles.option} ref={props.innerRef} {...props.innerProps}>
            {props.data.label}
        </div>
    );
}
