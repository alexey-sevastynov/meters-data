import Style from "./listInfoPanelMonth.module.scss";
import { ListInfoDataMonthType } from "@/redux/slices/MetersDataSlice";
import { ItemInfoPanelMonth } from "@/components/features/info-panel-month/list-info-panel-month/item-info-panel-month/ItemInfoPanelMonth";

interface ListInfoPanelMonthProps {
    isWaterBlock: boolean;
    items: ListInfoDataMonthType[] | null;
}

export function ListInfoPanelMonth({ isWaterBlock, items }: ListInfoPanelMonthProps) {
    return (
        <dl className={Style.listInfoPanelMonth}>
            {items?.map((props, index) => (
                <ItemInfoPanelMonth key={index} isWaterBlock={isWaterBlock} index={index} {...props} />
            ))}
        </dl>
    );
}
