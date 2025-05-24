import styles from "./listInfoPanelMonth.module.scss";
import { ItemInfoPanelMonth } from "@/components/features/info-panel-month/list-info-panel-month/item-info-panel-month/ItemInfoPanelMonth";

interface ListInfoPanelMonthProps {
    isWaterBlock: boolean;
    items:
        | {
              id: string;
              title: string;
              description: string;
              percentDifference: number;
          }[]
        | null;
}

export function ListInfoPanelMonth({ isWaterBlock, items }: ListInfoPanelMonthProps) {
    return (
        <dl className={styles.listInfoPanelMonth}>
            {items?.map((props, index) => (
                <ItemInfoPanelMonth key={index} isWaterBlock={isWaterBlock} index={index} {...props} />
            ))}
        </dl>
    );
}
