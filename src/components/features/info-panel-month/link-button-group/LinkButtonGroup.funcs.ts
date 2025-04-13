import { iconNames } from "@/components/ui/icon/icon-constants";
import { TranslationKeys } from "@/types/i-18-next-types";
import { LinkButton } from "@/components/features/info-panel-month/link-button-group/linkButtonGroup.interface";

export function getLinkButtons(pathname: string, translations: TranslationKeys) {
    const linksGroup: LinkButton[] = [
        {
            path: `${pathname}/price`,
            iconName: iconNames.priceTagFill,
            label: translations.infoPanel.price,
        },
        {
            path: `${pathname}/graphics`,
            iconName: iconNames.barChartSharp,
            label: translations.infoPanel.graphics,
        },
    ];

    return linksGroup;
}
