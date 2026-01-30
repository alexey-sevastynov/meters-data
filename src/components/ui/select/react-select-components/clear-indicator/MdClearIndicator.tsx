import styles from "./clearIndicator.module.scss";
import { ClearIndicatorProps, GroupBase } from "react-select";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { colorNames } from "@/enums/color-names";
import { CustomSelectProps, Option } from "@/components/ui/select/select-models";
import { isClearIndicatorShouldBeHidden } from "@/components/ui/select/react-select-components/clear-indicator/clearIndicator.funcs";

export function MdClearIndicator<OptionType = Option, IsMulti extends boolean = true>(
    props: ClearIndicatorProps<OptionType, IsMulti, GroupBase<OptionType>> & {
        selectProps: CustomSelectProps<OptionType>;
    },
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
