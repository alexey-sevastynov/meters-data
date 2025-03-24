import React from "react";
import { GroupedData } from "@/types/meter-data-type";
import { hasOneElement } from "@/helpers/has-one-element";
import Style from "./groupYear.module.scss";
import { ItemMetersData } from "./item-meters-data/ItemMetersData";
import { getLastYear, handleToggle } from "./GroupYear.function";
import YearHeader from "./year-header/YearHeader";
import { HeadMetersData } from "./head-meter-data/HeadMetersData";

interface GroupYearProps {
    year: string;
    group: GroupedData[string];
    isFirstGroup: boolean;
    isLastGroup: boolean;
    isWaterBlock: boolean;
    setGroupedData: React.Dispatch<React.SetStateAction<GroupedData>>;
    groupedData: GroupedData;
}

const GroupYear: React.FC<GroupYearProps> = ({
    year,
    group,
    isFirstGroup,
    isLastGroup,
    isWaterBlock,
    setGroupedData,
    groupedData,
}) => {
    const hasMultipleYears = !hasOneElement(groupedData);
    const lastYear = getLastYear(groupedData);

    return (
        <div key={year}>
            {hasMultipleYears && year !== lastYear && (
                <YearHeader
                    year={year}
                    isOpen={group.isOpen}
                    onToggle={() => handleToggle(year, setGroupedData)}
                />
            )}

            <HeadMetersData isWaterBlock={isWaterBlock} isOpen={group.isOpen} />
            <div className={`${Style.yearGroup} ${group.isOpen ? Style.open : ""}`}>
                {group.items.map((item, index) => {
                    const isOnlyOneYear = !hasMultipleYears;
                    const isFirstIndex = index === 0;
                    const isLastIndex = index === group.items.length - 1;

                    const isFirstItem = isFirstGroup && (isOnlyOneYear ? isLastIndex : isFirstIndex);
                    const isLastItem = isLastGroup && index === 0;

                    return (
                        <ItemMetersData
                            key={item._id}
                            isFirstItem={isFirstItem}
                            isLastItem={isLastItem}
                            isWaterBlock={isWaterBlock}
                            {...item}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GroupYear;
