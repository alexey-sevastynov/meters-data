import { ChangeEvent } from "react";
import Style from "./meterInputsList.module.scss";
import { InputField } from "@/components/features/meters-data/form-data-month/form-controls/inputFields";
import { MdInput } from "@/components/ui/input/MdInput";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { TranslationKeys } from "@/types/i-18-next-types";
import { MeterInput } from "@/components/features/meters-data/form-data-month/form-controls/meter-inputs-list/meter-input/MeterInput";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { categoryKeys } from "@/enums/category-keys";
import { SetStateFunc } from "@/types/getter-setter-functions";
import { numberToString } from "@/utils/conversion";

interface MeterInputsListProps {
    items: InputField[];
    isEdit: boolean;
    meterDataEdit: MeterDataWithObjectId | null;
    sortedAddressMeterData: MeterDataWithObjectId[];
    isWaterBlock: boolean;
    translations: TranslationKeys;
    water: string;
    setWater: SetStateFunc<string>;
}

export function MeterInputsList({
    items,
    isEdit,
    meterDataEdit,
    sortedAddressMeterData,
    isWaterBlock,
    translations,
    water,
    setWater,
}: MeterInputsListProps) {
    const isEditingMeterData = isEdit && meterDataEdit;
    const waterReadingValue = meterDataEdit?.water ?? 0;
    const waterDefaultValue = isEditingMeterData
        ? numberToString(waterReadingValue)
        : setDefaultValue(categoryKeys.water, sortedAddressMeterData);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        setWater(targetValue);
    };

    const returnCurrentValues = () => {
        setWater(waterDefaultValue);
    };

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
                    sortedAddressMeterData={sortedAddressMeterData}
                    className={Style.input}
                />
            ))}

            {isWaterBlock && (
                <MdInput
                    defaultValue={waterDefaultValue}
                    label={translations.infoPanel["Water general"]}
                    value={water}
                    onChange={onChange}
                    onReset={returnCurrentValues}
                    isEdit={isEdit}
                />
            )}
        </>
    );
}
