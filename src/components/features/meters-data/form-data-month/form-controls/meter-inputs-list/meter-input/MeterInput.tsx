import { ChangeEvent } from "react";
import { MdInput } from "@/components/ui/input/MdInput";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { CategoryKey } from "@/enums/category-keys";
import { MeterDataWithObjectId } from "@/store/models/meter-data";

interface MeterInputProps {
    isEdit: boolean;
    meterDataEdit: MeterDataWithObjectId | null;
    fieldKey: CategoryKey;
    labelText: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    currentPage: string;
    sortedAddressMeterData: MeterDataWithObjectId[];
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

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = Number(e.target.value);

        setValue(targetValue);
    };

    const returnCurrentValues = () => {
        setValue(initialMeterValue ?? 0);
    };

    return (
        <MdInput
            defaultValue={initialMeterValue}
            label={labelText}
            value={value}
            onChange={onChange}
            onReset={returnCurrentValues}
            isEdit={isEdit}
        />
    );
}
