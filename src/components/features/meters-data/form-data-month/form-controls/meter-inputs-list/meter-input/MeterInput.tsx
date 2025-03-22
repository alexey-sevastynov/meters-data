import { MdInput } from "@/components/ui/input/MdInput";
import { colors } from "@/constants/colors";
import { MeterDataType } from "@/types/MeterDataType";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.function";
import { KeysItemUtilityPricesType } from "@/types/KeysItemUtilityPricesType";

interface MeterInputProps {
  isEdit: boolean;
  meterDataEdit: MeterDataType | null;
  fieldKey: KeysItemUtilityPricesType;
  labelText: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
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
          ? Number(meterDataEdit?.[fieldKey])
          : setDefaultValue(fieldKey, currentPage, sortedAddressMeterData)
      }
      labelText={labelText}
      value={value}
      setValue={setValue}
    />
  );
}
