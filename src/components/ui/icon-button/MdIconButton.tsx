import styles from "./iconButton.module.scss";
import { useTheme } from "@/components/context/theme-provider/ThemeProvider";
import { IconName } from "@/components/ui/icon/icon-constants";
import { getBaseIconColor } from "@/helpers/theme/get-icon-color";
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { VoidFuncNoParam } from "@/types/getter-setter-functions";

interface MdIconButtonProps {
    iconName: IconName;
    tooltip: string;
    onClick: VoidFuncNoParam;
}

export function MdIconButton({ iconName, tooltip, onClick }: MdIconButtonProps) {
    const theme = useTheme();
    const iconColor = getBaseIconColor(theme.themeMode);

    return (
        <button className={styles.root} onClick={onClick} title={tooltip}>
            <MdIcon name={iconName} color={iconColor} />
        </button>
    );
}
