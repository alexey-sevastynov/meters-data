import React, { useEffect, useRef, useState } from "react";
import Style from "./listMetersData.module.scss";
import GroupYear from "@/components/features/meters-data/list-meters-data/group-year/GroupYear";
import { useAppSelector } from "@/store/hook";
import { useLocation } from "react-router-dom";
import { GroupedData } from "@/types/grouped-data";
import { statusNames } from "@/constants/status";
import {
    groupAndSortItemsByYear,
    isEmptyList,
} from "@/components/features/meters-data/list-meters-data/listMetersData.function";

interface ListMetersDataProps {
    isWaterBlock: boolean;
}

export const ListMetersData: React.FC<ListMetersDataProps> = ({ isWaterBlock }) => {
    const { pathname } = useLocation();
    const items = useAppSelector((state) => state.metersData.items);
    const status = useAppSelector((state) => state.metersData.status);
    const addressCurrentPage = pathname.slice(1);
    const [groupedData, setGroupedData] = useState<GroupedData>({});
    const listMetersDataRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (items.length > 0) {
            const grouped = groupAndSortItemsByYear(items, addressCurrentPage);
            setGroupedData(grouped);
        }
    }, [items, addressCurrentPage]);

    return (
        <ul ref={listMetersDataRef} className={Style.listMetersData}>
            {status === statusNames.loading && <p>Loading...</p>}
            {isEmptyList(groupedData, status) ? (
                <p>No data</p>
            ) : (
                Object.entries(groupedData).map(([year, group], index, array) => (
                    <GroupYear
                        key={year}
                        year={year}
                        group={group}
                        isFirstGroup={index === 0}
                        isLastGroup={index === array.length - 1}
                        isWaterBlock={isWaterBlock}
                        setGroupedData={setGroupedData}
                        groupedData={groupedData}
                    />
                ))
            )}
        </ul>
    );
};
