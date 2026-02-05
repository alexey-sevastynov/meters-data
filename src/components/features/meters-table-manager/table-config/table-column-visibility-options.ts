import { Option } from "@/components/ui/select/select-models";
import { tableMeterDataColumnKeys } from "@/components/shared/table/table-enums";
import { TranslationKeys } from "@/types/i-18-next-types";

export function getTableMeterDataColumnVisibilityOptions(translations: TranslationKeys) {
    const options: Option[] = [
        getTableMeterDataColumnIdOption(translations),
        getTableMeterDataColumnCreatedAtOption(translations),
        getTableMeterDataColumnUpdatedAtOption(translations),
    ];

    return options;
}

export function getTableMeterDataMetaColumnVisibilityOptions(translations: TranslationKeys) {
    const options: Option[] = [
        getTableMeterDataColumnCreatedAtOption(translations),
        getTableMeterDataColumnUpdatedAtOption(translations),
    ];

    return options;
}

function getTableMeterDataColumnIdOption(translations: TranslationKeys) {
    const option: Option = {
        label: translations.table.id as string,
        value: tableMeterDataColumnKeys.id,
    };

    return option;
}

function getTableMeterDataColumnUpdatedAtOption(translations: TranslationKeys) {
    const option: Option = {
        label: translations.table.updatedAt as string,
        value: tableMeterDataColumnKeys.updatedAt,
    };
    return option;
}

function getTableMeterDataColumnCreatedAtOption(translations: TranslationKeys) {
    const option: Option = {
        label: translations.table.createdAt as string,
        value: tableMeterDataColumnKeys.createdAt,
    };

    return option;
}
