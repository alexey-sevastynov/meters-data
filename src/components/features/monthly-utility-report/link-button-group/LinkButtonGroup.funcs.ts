import { iconNames } from "@/components/ui/icon/icon-constants";
import { LinkButton } from "@/components/features/monthly-utility-report/link-button-group/linkButtonGroup.interface";
import { TranslationKeys } from "@/types/i-18-next-types";

export function getLinkButtons(pathname: string, translations: TranslationKeys) {
    const linksGroup: LinkButton[] = [
        {
            path: `${pathname}/price`,
            iconName: iconNames.priceTagFill,
            label: translations.infoPanel.price,
            description: translations.infoPanel.priceDescription,
        },
        {
            path: `${pathname}/graphics`,
            iconName: iconNames.barChartSharp,
            label: translations.infoPanel.graphics,
            description: translations.infoPanel.graphicsDescription,
        },
        {
            path: `${pathname}/info`,
            iconName: iconNames.info,
            label: translations.infoPanel.info,
            description: translations.infoPanel.infoDescription,
        },
    ];

    return linksGroup;
}
