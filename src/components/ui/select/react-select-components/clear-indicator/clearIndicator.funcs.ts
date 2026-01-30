import { MultiValue } from "react-select";

export function isClearIndicatorShouldBeHidden<OptionType>(
    selectedValues: OptionType | MultiValue<OptionType> | null,
    preventClearLastOption?: boolean,
) {
    return isSingleValueSelected(selectedValues) && isClearPrevented(preventClearLastOption);
}

function isClearPrevented(preventClearLastOption?: boolean) {
    return preventClearLastOption === true;
}

function isSingleValueSelected<OptionType>(selectedValues: OptionType | MultiValue<OptionType> | null) {
    return Array.isArray(selectedValues) && selectedValues.length === 1;
}
