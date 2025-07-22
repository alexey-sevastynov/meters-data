import styles from "./clearIndicator.module.scss";
import { ClearIndicatorProps, GroupBase } from "react-select";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";
import { CustomSelectProps, Option } from "@/components/ui/input-group/input-group-models";
import { isClearIndicatorShouldBeHidden } from "@/components/ui/input-group/clear-indicator/clearIndicator.funcs";

export function MdClearIndicator(
    props: ClearIndicatorProps<Option, true, GroupBase<Option>> & { selectProps: CustomSelectProps<Option> }
) {
    if (isClearIndicatorShouldBeHidden(props.selectProps.value, props.selectProps.preventClearLastOption)) {
        return null;
    }

    return (
        <div {...props.innerProps} className={styles.clearIndicator}>
            <MdIcon name={iconNames.close} color={colorNames.grey} />
        </div>
    );
}
