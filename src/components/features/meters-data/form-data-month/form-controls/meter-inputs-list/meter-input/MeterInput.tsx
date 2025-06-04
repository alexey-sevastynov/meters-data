import { ChangeEvent } from "react";
import { MdInput } from "@/components/ui/input/MdInput";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { CategoryKey } from "@/enums/category-keys";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { SetStateFunc } from "@/types/getter-setter-functions";
import { numberToString } from "@/utils/conversion";

interface MeterInputProps {
    isEdit: boolean;
    meterDataEdit: MeterDataWithObjectId | null;
    fieldKey: CategoryKey;
    labelText: string;
    value: string;
    setValue: SetStateFunc<string>;
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
    sortedAddressMeterData,
    className,
}: MeterInputProps) {
    const isEditingMeterData = isEdit && meterDataEdit;

    const valueFromEdit = numberToString(meterDataEdit?.[fieldKey]);
    const defaultValue = setDefaultValue(fieldKey, sortedAddressMeterData);

    const initialMeterValue = isEditingMeterData ? valueFromEdit : defaultValue;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        setValue(targetValue);
    };

    const returnCurrentValues = () => {
        setValue(initialMeterValue);
    };

    return (
        <MdInput
            defaultValue={initialMeterValue}
            label={labelText}
            value={value}
            onChange={onChange}
            onReset={returnCurrentValues}
            isEdit={isEdit}
            className={className}
        />
    );
}
