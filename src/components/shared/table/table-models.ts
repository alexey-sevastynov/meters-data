export interface TableColumn<K = string, L = string> {
    key: K;
    label: L;
    type?: TableColumnTypes;
    align?: TableColumnAlign;
    isDisplayable?: boolean;
}

export interface TableRow {
    [key: string]: unknown;
    isLatestData?: boolean;
}

export const tableColumnTypes = {
    string: 0,
    number: 1,
    boolean: 2,
    date: 3,
    actions: 4,
} as const;

export type TableColumnTypes = (typeof tableColumnTypes)[keyof typeof tableColumnTypes];

export const tableColumnAligns = {
    left: 0,
    right: 1,
    center: 2,
} as const;

export type TableColumnAlign = (typeof tableColumnAligns)[keyof typeof tableColumnAligns];
