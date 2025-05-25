import styles from "./monthlyInfoList.module.scss";
import { MdMonthlyInfoItem } from "@/components/features/monthly-utility-report/monthly-info-list/monthly-info-item/ItemInfoPanelMonth";
import { UtilityCost } from "@/types/utility-cost";

interface MonthlyInfoListProps {
    isWaterBlock: boolean;
    items: UtilityCost[] | null;
}

export function MdMonthlyInfoList({ isWaterBlock, items }: MonthlyInfoListProps) {
    return (
        <dl className={styles.root}>
            {items?.map((props, index) => (
                <MdMonthlyInfoItem key={index} isWaterBlock={isWaterBlock} index={index} {...props} />
            ))}
        </dl>
    );
}
