import { MdInput } from "@/components/ui/input/MdInput";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { CategoryKey } from "@/enums/category-keys";
import { MeterData } from "@/store/models/meter-data";

interface MeterInputProps {
    isEdit: boolean;
    meterDataEdit: MeterData | null;
    fieldKey: CategoryKey;
    labelText: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    currentPage: string;
    sortedAddressMeterData: MeterData[];
    className: string;
}

export function MeterInput({
    isEdit,
    meterDataEdit,
    fieldKey,
    labelText,
    value,
    setValue,
    currentPage,
    sortedAddressMeterData,
}: MeterInputProps) {
    const isEditingMeterData = isEdit && meterDataEdit;
    const initialMeterValue = isEditingMeterData
        ? meterDataEdit?.[fieldKey]
        : setDefaultValue(fieldKey, currentPage, sortedAddressMeterData);

    return (
        <MdInput
            defaultValue={initialMeterValue}
            label={labelText}
            value={value}
            setValue={setValue}
            isEdit={isEdit}
        />
    );
}
