import styles from "./control.module.scss";
import { ControlProps } from "react-select";
import { cn } from "@/lib/cn";
import { Option } from "@/components/ui/input-group/input-group-models";

export function MdControl(props: ControlProps<Option, true>) {
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
