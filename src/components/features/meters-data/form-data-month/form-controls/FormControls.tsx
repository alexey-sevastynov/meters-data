import Style from "./formControls.module.scss";
import { SelectDate } from "@/components/features/meters-data/form-data-month/form-controls/select-date/SelectDate";
import { createInputFields } from "./inputFields";
import { FormControlsProps } from "./formControls.interface";
import { MeterInputsList } from "./meter-inputs-list/MeterInputsList";

export function FormControls({
    isWaterBlock,
    selectDate,
    setSelectDate,
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
    sortedAddressMeterData,
    translations,
}: FormControlsProps) {
    const inputFields = createInputFields({
        translations,
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
            <SelectDate selectDate={selectDate} setSelectDate={setSelectDate} />

            <MeterInputsList
                items={inputFields}
                isEdit={isEdit}
                meterDataEdit={meterDataEdit}
                sortedAddressMeterData={sortedAddressMeterData}
                isWaterBlock={isWaterBlock}
                translations={translations}
                water={water}
                setWater={setWater}
            />
        </div>
    );
}
