import { MultiValue } from "react-select";
import { Option } from "@/components/ui/select/select-models";

export function isTryingToRemoveLastOption(value: MultiValue<Option>, preventClearLastOption: boolean) {
    return preventClearLastOption && value.length === 0;
}
