import styles from "./multiValueRemove.module.scss";
import { colorNames } from "@/enums/color-names";
import { MultiValueRemoveProps } from "react-select";
import { iconNames, iconSizes } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { Option } from "@/components/ui/select/select-models";

export function MdMultiValueRemove(props: MultiValueRemoveProps<Option>) {
    return (
        <div {...props.innerProps} className={styles.multiValueRemove}>
            <MdIcon name={iconNames.close} color={colorNames.black} size={iconSizes.small} />
        </div>
    );
}
