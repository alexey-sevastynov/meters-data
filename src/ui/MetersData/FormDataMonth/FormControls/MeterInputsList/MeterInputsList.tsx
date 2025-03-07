import { MeterInput } from "@/ui/MetersData/FormDataMonth/FormControls/MeterInputsList/MeterInput/MeterInput";
import Style from "@/ui/MetersData/FormDataMonth/FormControls/formControls.module.scss";
import { InputField } from "@/ui/MetersData/FormDataMonth/FormControls/inputFields";
import { MeterDataType } from "@/types/MeterDataType";
import { Input } from "@/components/Input/Input";
import { COLORS } from "@/constants";
import { setDefaultValue } from "@/ui/MetersData/FormDataMonth/formDataMonth.function";

interface MeterInputsListProps {
  items: InputField[];
  isEdit: boolean;
  meterDataEdit: MeterDataType | null;
  currentPage: number;
  listCurrentPage: MeterDataType[];
  isWaterBlock: boolean;
  lang: any;
  water: number;
  setWater: React.Dispatch<React.SetStateAction<number>>;
}

export function MeterInputsList({
  items,
  isEdit,
  meterDataEdit,
  currentPage,
  listCurrentPage,
  isWaterBlock,
  lang,
  water,
  setWater,
}: MeterInputsListProps) {
  return (
    <>
      {items.map(({ key, label, value, setValue }) => (
        <MeterInput
          key={key}
          isEdit={isEdit}
          meterDataEdit={meterDataEdit}
          fieldKey={key}
          labelText={label}
          value={value}
          setValue={setValue}
          currentPage={currentPage}
          listCurrentPage={listCurrentPage}
          className={Style.input}
        />
      ))}

      {isWaterBlock && (
        <Input
          className={Style.input}
          style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
          labelTextBold
          defaultValue={
            isEdit && meterDataEdit
              ? meterDataEdit?.water || 0
              : setDefaultValue("water", currentPage, listCurrentPage)
          }
          labelText={lang.infoPanel["Water general"]}
          value={water}
          setValue={setWater}
        />
      )}
    </>
  );
}
