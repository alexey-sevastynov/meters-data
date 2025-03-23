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
            <SelectDate selectDate={selectDate} setSelectDate={setSelectDate} />

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
