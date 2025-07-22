import styles from "./indicatorsContainer.module.scss";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { GroupBase, IndicatorsContainerProps } from "react-select";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";
import { Option } from "@/components/ui/input-group/input-group-models";

export function MdIndicatorsContainer(props: IndicatorsContainerProps<Option, true, GroupBase<Option>>) {
    const theme = useTheme();

    return (
        <div {...props.innerProps} className={styles.indicatorsContainer}>
            <MdIcon name={iconNames.arrowDown} color={getBaseIconColor(theme.themeMode)} />
        </div>
    );
}
