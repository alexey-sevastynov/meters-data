import Style from "@/ui/MetersData/FormDataMonth/FormControls/formControls.module.scss";
import { COLORS } from "@/constants";
import { SelectDate } from "@/components/SelectDate/SelectDate";
import { Input } from "@/components/Input/Input";
import { setDefaultValue } from "../formDataMonth.function";
import React from "react";
import { MeterDataType } from "@/types/MeterDataType";

interface FormControlsProps {
  isWaterBlock: boolean;
  valueSelectDate: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  light: number;
  setLight: React.Dispatch<React.SetStateAction<number>>;
  lightDay: number;
  setLightDay: React.Dispatch<React.SetStateAction<number>>;
  lightNight: number;
  setLightNight: React.Dispatch<React.SetStateAction<number>>;
  water: number;
  setWater: React.Dispatch<React.SetStateAction<number>>;
  gas: number;
  setGas: React.Dispatch<React.SetStateAction<number>>;
  isEdit: boolean;
  meterDataEdit: MeterDataType | null;
  currentPage: number;
  listCurrentPage: MeterDataType[];
  lang: any;
}

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
  listCurrentPage,
  lang,
}: FormControlsProps) {
  return (
    <div className={Style.inputs}>
      <SelectDate
        value={valueSelectDate}
        onChange={onChange}
      />
      <Input
        className={Style.input}
        style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
        labelTextBold
        defaultValue={
          isEdit && meterDataEdit
            ? meterDataEdit?.light
            : setDefaultValue("light", currentPage, listCurrentPage)
        }
        labelText={lang.infoPanel["Light general"]}
        value={light}
        setValue={setLight}
      />
      <Input
        className={Style.input}
        style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
        labelTextBold
        defaultValue={
          isEdit && meterDataEdit
            ? meterDataEdit?.lightDay
            : setDefaultValue("lightDay", currentPage, listCurrentPage)
        }
        labelText={lang.infoPanel["Light day"]}
        value={lightDay}
        setValue={setLightDay}
      />
      <Input
        className={Style.input}
        style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
        labelTextBold
        defaultValue={
          isEdit && meterDataEdit
            ? meterDataEdit?.lightNight
            : setDefaultValue("lightNight", currentPage, listCurrentPage)
        }
        labelText={lang.infoPanel["Light night"]}
        value={lightNight}
        setValue={setLightNight}
      />
      <Input
        className={Style.input}
        style={isEdit ? { backgroundColor: COLORS.lightGreen } : {}}
        labelTextBold
        defaultValue={
          isEdit && meterDataEdit
            ? meterDataEdit?.gas
            : setDefaultValue("gas", currentPage, listCurrentPage)
        }
        labelText={lang.infoPanel["Gas General"]}
        value={gas}
        setValue={setGas}
      />
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
    </div>
  );
}
