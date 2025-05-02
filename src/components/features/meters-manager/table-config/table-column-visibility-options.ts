import { Option } from "@/components/ui/input-group/input-group-models";
import { tableMeterDataColumnKeys } from "@/components/shared/table/table-enums";
import { TranslationKeys } from "@/types/i-18-next-types";

export function getTableMeterDataColumnIdOption(translations: TranslationKeys) {
    const option: Option = {
        label: translations.table.id as string,
        value: tableMeterDataColumnKeys.id,
    };

    return option;
}

export function getTableMeterDataColumnCreatedAtOption(translations: TranslationKeys) {
    const option: Option = {
        label: translations.table.createdAt as string,
        value: tableMeterDataColumnKeys.createdAt,
    };

    return option;
}

export function getTableMeterDataColumnUpdatedAtOption(translations: TranslationKeys) {
    const option: Option = {
        label: translations.table.updatedAt as string,
        value: tableMeterDataColumnKeys.updatedAt,
    };
    return option;
}

export function getTableMeterDataColumnVisibilityOptions(translations: TranslationKeys) {
    const options: Option[] = [
        getTableMeterDataColumnIdOption(translations),
        getTableMeterDataColumnCreatedAtOption(translations),
        getTableMeterDataColumnUpdatedAtOption(translations),
    ];

    return options;
}
