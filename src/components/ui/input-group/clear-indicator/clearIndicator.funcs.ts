import { MultiValue } from "react-select";
import { Option } from "@/components/ui/input-group/input-group-models";

export function isClearIndicatorShouldBeHidden(
    selectedValues: ((Option | MultiValue<Option>) & (Option | MultiValue<Option> | undefined)) | null,
    preventClearLastOption?: boolean
) {
    return isSingleValueSelected(selectedValues) && isClearPrevented(preventClearLastOption);
}

function isClearPrevented(preventClearLastOption?: boolean) {
    return preventClearLastOption === true;
}

function isSingleValueSelected(
    selectedValues: ((Option | MultiValue<Option>) & (Option | MultiValue<Option> | undefined)) | null
) {
    return Array.isArray(selectedValues) && selectedValues.length === 1;
}
