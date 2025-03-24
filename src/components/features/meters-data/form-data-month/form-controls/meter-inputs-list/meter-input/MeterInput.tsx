import { MdInput } from "@/components/ui/input/MdInput";
import { colors } from "@/constants/colors";
import { MeterDataType } from "@/types/meter-data-type";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { categoryKey } from "@/enums/category-keys";

interface MeterInputProps {
    isEdit: boolean;
    meterDataEdit: MeterDataType | null;
    fieldKey: categoryKey;
    labelText: string;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    currentPage: string;
    sortedAddressMeterData: MeterDataType[];
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
    className,
}: MeterInputProps) {
    return (
        <MdInput
            className={className}
            style={isEdit ? { backgroundColor: colors.lightGreen } : {}}
            labelTextBold
            defaultValue={
                isEdit && meterDataEdit
                    ? meterDataEdit?.[fieldKey]
                    : setDefaultValue(fieldKey, currentPage, sortedAddressMeterData)
            }
            labelText={labelText}
            value={value}
            setValue={setValue}
        />
    );
}
