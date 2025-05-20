import React from "react";
import Style from "./groupYear.module.scss";
import { cn } from "@/lib/cn";
import { GroupedData } from "@/types/grouped-data";
import { ItemMetersData } from "@/components/features/meters-data/list-meters-data/group-year/item-meters-data/ItemMetersData";
import {
    getLastYear,
    handleToggle,
    hasOneElement,
} from "@/components/features/meters-data/list-meters-data/group-year/GroupYear.function";
import YearHeader from "@/components/features/meters-data/list-meters-data/group-year/year-header/YearHeader";
import { HeadMetersData } from "@/components/features/meters-data/list-meters-data/group-year/head-meter-data/HeadMetersData";

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
            <div className={cn(Style.yearGroup, group.isOpen && Style.open)}>
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
                            meterData={{
                                _id: item._id,
                                date: item.date,
                                address: item.address,
                                light: item.light,
                                lightDay: item.lightDay,
                                lightNight: item.lightNight,
                                gas: item.gas,
                                water: item.water,
                                createdAt: item.createdAt,
                                updatedAt: item.updatedAt,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GroupYear;
