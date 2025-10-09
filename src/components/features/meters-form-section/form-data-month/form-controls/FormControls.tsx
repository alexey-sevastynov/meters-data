import styles from "./formControls.module.scss";
import { SelectDate } from "@/components/features/meters-form-section/form-data-month/form-controls/select-date/SelectDate";
import { createInputFields } from "@/components/features/meters-form-section/form-data-month/form-controls/inputFields";
import { FormControlsProps } from "@/components/features/meters-form-section/form-data-month/form-controls/formControls.interface";
import { MeterInputsList } from "@/components/features/meters-form-section/form-data-month/form-controls/meter-inputs-list/MeterInputsList";

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
    setErrorMessage,
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
        <div className={styles.inputs}>
            <SelectDate
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                setErrorMessage={setErrorMessage}
            />

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
