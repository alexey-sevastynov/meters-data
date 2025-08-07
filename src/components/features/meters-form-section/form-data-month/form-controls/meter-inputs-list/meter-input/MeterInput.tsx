import { ChangeEvent } from "react";
import { CategoryKey } from "@/enums/category-keys";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { SetStateFunc } from "@/types/getter-setter-functions";
import { IconName } from "@/components/ui/icon/icon-constants";
import { MdInputModern } from "@/components/ui/input/input-modern/MdInputModern";

interface MeterInputProps {
    isEdit: boolean;
    meterDataEdit: MeterDataWithObjectId | null;
    fieldKey: CategoryKey;
    labelText: string;
    value: string;
    setValue: SetStateFunc<string>;
    sortedAddressMeterData: MeterDataWithObjectId[];
    className: string;
    iconName: IconName;
}

export function MeterInput({ isEdit, labelText, value, setValue, className, iconName }: MeterInputProps) {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        setValue(targetValue);
    };

    return (
        <MdInputModern
            label={labelText}
            value={value}
            onChange={onChange}
            isEdit={isEdit}
            className={className}
            iconName={iconName}
        />
    );
}
