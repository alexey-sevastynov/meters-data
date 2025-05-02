import {
    tableColumnAligns,
    tableColumnTypes,
    tableMeterDataColumnKeys,
    tableMeterDataColumnLabels,
} from "@/components/shared/table/table-enums";
import { minWidthIdColumn } from "@/components/shared/table/table-constants";

export const idColumn = {
    key: tableMeterDataColumnKeys.id,
    label: tableMeterDataColumnLabels.id,
    type: tableColumnTypes.string,
    align: tableColumnAligns.left,
    minWidth: minWidthIdColumn,
};
