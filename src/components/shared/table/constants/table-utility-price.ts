import {
    TableColumn,
    tableColumnAligns,
    tableColumnTypes,
    TableRow,
} from "@/components/shared/table/table-models";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { UtilityPrice } from "@/store/models/utility-price";

export function getTableUtilityPriceColumns() {
    const idColumn: TableColumn<TableUtilityPriceColumnKey, TableUtilityPriceColumnLabel> = {
        key: tableUtilityPriceColumnKeys.id,
        label: tableUtilityPriceColumnLabels.id,
        type: tableColumnTypes.string,
        align: tableColumnAligns.left,
    };

    const actionColumn: TableColumn<TableUtilityPriceColumnKey, TableUtilityPriceColumnLabel> = {
        key: tableUtilityPriceColumnKeys.actions,
        label: tableUtilityPriceColumnLabels.actions,
        type: tableColumnTypes.actions,
        align: tableColumnAligns.center,
    };

    const categoryColumn: TableColumn<TableUtilityPriceColumnKey, TableUtilityPriceColumnLabel> = {
        key: tableUtilityPriceColumnKeys.category,
        label: tableUtilityPriceColumnLabels.category,
        type: tableColumnTypes.string,
        align: tableColumnAligns.left,
    };

    const valueColumn: TableColumn<TableUtilityPriceColumnKey, TableUtilityPriceColumnLabel> = {
        key: tableUtilityPriceColumnKeys.value,
        label: tableUtilityPriceColumnLabels.value,
        type: tableColumnTypes.number,
        align: tableColumnAligns.right,
    };

    const valueNameColumn: TableColumn<TableUtilityPriceColumnKey, TableUtilityPriceColumnLabel> = {
        key: tableUtilityPriceColumnKeys.valueName,
        label: tableUtilityPriceColumnLabels.valueName,
        type: tableColumnTypes.string,
        align: tableColumnAligns.left,
    };

    const imageColumn: TableColumn<TableUtilityPriceColumnKey, TableUtilityPriceColumnLabel> = {
        key: tableUtilityPriceColumnKeys.image,
        label: tableUtilityPriceColumnLabels.image,
        type: tableColumnTypes.string,
        align: tableColumnAligns.left,
    };

    const columns: TableColumn<TableUtilityPriceColumnKey, TableUtilityPriceColumnLabel>[] = [
        actionColumn,
        idColumn,
        categoryColumn,
        valueColumn,
        valueNameColumn,
        imageColumn,
    ];

    return columns;
}

export function getTableUtilityPriceRows(data: UtilityPrice[]) {
    const rows: TableRow[] = [];

    for (const item of data) {
        const row: TableRow = {
            id: item._id,
            category: item.category,
            value: item.value,
            valueName: item.valueName,
            image: item.image,
            actions: [
                {
                    icon: iconNames.view,
                    onClick: () => {},
                    label: "Переглянути",
                    visible: true,
                },
                {
                    icon: iconNames.edit,
                    onClick: () => {},
                    visible: true,
                    label: "Редагувати",
                },
            ],
        };

        rows.push(row);
    }

    return rows;
}

export const tableUtilityPriceColumnKeys = {
    id: "id",
    actions: "actions",
    category: "category",
    value: "value",
    valueName: "valueName",
    image: "image",
} as const;

type TableUtilityPriceColumnKey =
    (typeof tableUtilityPriceColumnKeys)[keyof typeof tableUtilityPriceColumnKeys];

const tableUtilityPriceColumnLabels = {
    id: "id",
    actions: "actions",
    category: "Категорія",
    value: "Ціна",
    valueName: "Одиниця",
    image: "Зображення",
} as const;

type TableUtilityPriceColumnLabel =
    (typeof tableUtilityPriceColumnLabels)[keyof typeof tableUtilityPriceColumnLabels];
