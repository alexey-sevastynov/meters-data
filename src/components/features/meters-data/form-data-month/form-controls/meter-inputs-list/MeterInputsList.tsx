import Style from "./meterInputsList.module.scss";
import { InputField } from "@/components/features/meters-data/form-data-month/form-controls/inputFields";
import { MdInput } from "@/components/ui/input/MdInput";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { TranslationKeys } from "@/types/i-18-next-types";
import { MeterInput } from "@/components/features/meters-data/form-data-month/form-controls/meter-inputs-list/meter-input/MeterInput";
import { MeterData } from "@/store/models/meter-data";
import { categoryKeys } from "@/enums/category-keys";

interface MeterInputsListProps {
    items: InputField[];
    isEdit: boolean;
    meterDataEdit: MeterData | null;
    currentPage: string;
    sortedAddressMeterData: MeterData[];
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
    const isEditingMeterData = isEdit && meterDataEdit;
    const waterReadingValue = meterDataEdit?.water ?? 0;
    const waterDefaultValue = isEditingMeterData
        ? waterReadingValue
        : setDefaultValue(categoryKeys.water, currentPage, sortedAddressMeterData);

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
                    defaultValue={waterDefaultValue}
                    label={lang.infoPanel["Water general"]}
                    value={water}
                    setValue={setWater}
                    isEdit={isEdit}
                />
            )}
        </>
    );
}
