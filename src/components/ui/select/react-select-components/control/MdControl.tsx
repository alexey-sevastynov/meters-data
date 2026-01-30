import styles from "./control.module.scss";
import { ControlProps } from "react-select";
import { cn } from "@/lib/cn";
import { Option } from "@/components/ui/select/select-models";

export function MdControl<OptionType = Option, IsMulti extends boolean = false>(
    props: ControlProps<OptionType, IsMulti>,
) {
    return (
        <div
            {...props.innerProps}
            ref={props.innerRef}
            className={cn(styles.control, props.isFocused && styles.focused)}
        >
            {props.children}
        </div>
    );
}
