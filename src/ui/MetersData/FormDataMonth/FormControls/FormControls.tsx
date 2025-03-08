import Style from "@/ui/MetersData/FormDataMonth/FormControls/formControls.module.scss";
import { SelectDate } from "@/components/SelectDate/SelectDate";
import { createInputFields } from "@/ui/MetersData/FormDataMonth/FormControls/inputFields";
import { FormControlsProps } from "@/ui/MetersData/FormDataMonth/FormControls/formControls.interface";
import { MeterInputsList } from "@/ui/MetersData/FormDataMonth/FormControls/MeterInputsList/MeterInputsList";

export function FormControls({
  isWaterBlock,
  valueSelectDate,
  onChange,
  light,
  setLight,
  lightDay,
  lightNight,
  setLightNight,
  setLightDay,
  water,
  setWater,
  gas,
  setGas,
  isEdit,
  meterDataEdit,
  currentPage,
  sortedAddressMeterData,
  lang,
}: FormControlsProps) {
  const inputFields = createInputFields({
    lang,
    light,
    setLight,
    lightDay,
    setLightDay,
    lightNight,
    setLightNight,
    gas,
    setGas,
  });

  return (
    <div className={Style.inputs}>
      <SelectDate
        value={valueSelectDate}
        onChange={onChange}
      />

      <MeterInputsList
        items={inputFields}
        isEdit={isEdit}
        meterDataEdit={meterDataEdit}
        currentPage={currentPage}
        sortedAddressMeterData={sortedAddressMeterData}
        isWaterBlock={isWaterBlock}
        lang={lang}
        water={water}
        setWater={setWater}
      />
    </div>
  );
}
