import Style from "./meterInputsList.module.scss";
import { InputField } from "@/components/features/meters-data/form-data-month/form-controls/inputFields";
import { MeterDataType } from "@/types/MeterDataType";
import { MdInput } from "@/components/ui/input/MdInput";
import { COLORS } from "@/constants";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.function";
import { TranslationKeys } from "@/types/I18nextTypes";
import { MeterInput } from "./MeterInput/MeterInput";

interface MeterInputsListProps {
  items: InputField[];
  isEdit: boolean;
  meterDataEdit: MeterDataType | null;
  currentPage: number;
  sortedAddressMeterData: MeterDataType[];
  isWaterBlock: boolean;
  lang: TranslationKeys;
  water: number;
  setWater: React.Dispatch<React.SetStateAction<number>>;
}

export function MeterInputsList({
  items,
  isEdit,
  meterDataEdit,
  currentPage,
  sortedAddressMeterData,
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
          sortedAddressMeterData={sortedAddressMeterData}
          className={Style.input}
        />
      ))}

      {isWaterBlock && (
        <MdInput
          className={Style.input}
          style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
          labelTextBold
          defaultValue={
            isEdit && meterDataEdit
              ? meterDataEdit?.water || 0
              : setDefaultValue("water", currentPage, sortedAddressMeterData)
          }
          labelText={lang.infoPanel["Water general"]}
          value={water}
          setValue={setWater}
        />
      )}
    </>
  );
}
