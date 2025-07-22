import styles from "./multiValueLabel.module.scss";
import { GroupBase, MultiValueGenericProps } from "react-select";
import { Option } from "@/components/ui/input-group/input-group-models";

export function MdMultiValueLabel(props: MultiValueGenericProps<Option, true, GroupBase<Option>>) {
    return <div className={styles.multiValueLabel}>{props.data.label}</div>;
}
