import { IconName } from "@/components/ui/icon/icon-constants";
import {
    TableColumnAlign,
    TableColumnTypes,
    TableSortDirection,
} from "@/components/shared/table/table-enums";

export interface TableColumn<ColumnKey = string, ColumnLabel = string> {
    key: ColumnKey;
    label: ColumnLabel;
    type?: TableColumnTypes;
    align?: TableColumnAlign;
    isDisplayable?: boolean;
    sort?: TableColumnSort;
    minWidth?: number;
}

export interface TableRow {
    [key: string]: unknown;
    isLatestData?: boolean;
    actions?: TableAction[];
}

export interface TableAction {
    icon: IconName;
    onClick: (row: TableRow) => void;
    label: string;
    visible?: boolean;
}

export interface TableColumnSort<T = unknown> {
    sortByAsc: (a: T, b: T) => number;
    sortByDesc: (a: T, b: T) => number;
    defaultDirection: TableSortDirection;
}
