import { MdInput } from "@/components/ui/input/MdInput";
import { colors } from "@/constants/colors";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { categoryKey } from "@/enums/category-keys";
import { MeterData } from "@/store/models/meter-data";

interface MeterInputProps {
    isEdit: boolean;
    meterDataEdit: MeterData | null;
    fieldKey: categoryKey;
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
