import { Input } from "@/components/Input/Input";
import { COLORS } from "@/constants";
import { MeterDataType } from "@/types/MeterDataType";
import { setDefaultValue } from "@/ui/MetersData/FormDataMonth/formDataMonth.function";
import { KeysItemUtilityPricesType } from "@/types/KeysItemUtilityPricesType";

interface MeterInputProps {
  isEdit: boolean;
  meterDataEdit: MeterDataType | null;
  fieldKey: KeysItemUtilityPricesType;
  labelText: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  listCurrentPage: MeterDataType[];
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
  listCurrentPage,
  className,
}: MeterInputProps) {
  return (
    <Input
      className={className}
      style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
      labelTextBold
      defaultValue={
        isEdit && meterDataEdit
          ? Number(meterDataEdit?.[fieldKey])
          : setDefaultValue(fieldKey, currentPage, listCurrentPage)
      }
      labelText={labelText}
      value={value}
      setValue={setValue}
    />
  );
}
