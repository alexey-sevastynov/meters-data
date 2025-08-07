import { ChangeEvent } from "react";
import styles from "./meterInputsList.module.scss";
import { InputField } from "@/components/features/meters-form-section/form-data-month/form-controls/inputFields";
import { TranslationKeys } from "@/types/i-18-next-types";
import { MeterInput } from "@/components/features/meters-form-section/form-data-month/form-controls/meter-inputs-list/meter-input/MeterInput";
import { MeterDataWithObjectId } from "@/store/models/meter-data";
import { SetStateFunc } from "@/types/getter-setter-functions";
import { MdInputModern } from "@/components/ui/input/input-modern/MdInputModern";
import { iconNames } from "@/components/ui/icon/icon-constants";

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
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = e.target.value;

        setWater(targetValue);
    };

    return (
        <>
            {items.map(({ key, label, value, setValue, iconName }) => (
                <MeterInput
                    key={key}
                    isEdit={isEdit}
                    meterDataEdit={meterDataEdit}
                    fieldKey={key}
                    labelText={label}
                    value={value}
                    setValue={setValue}
                    sortedAddressMeterData={sortedAddressMeterData}
                    className={styles.input}
                    iconName={iconName}
                />
            ))}

            {isWaterBlock && (
                <MdInputModern
                    label={translations.infoPanel["Water general"]}
                    value={water}
                    onChange={onChange}
                    isEdit={isEdit}
                    className={styles.input}
                    iconName={iconNames.water}
                />
            )}
        </>
    );
}
