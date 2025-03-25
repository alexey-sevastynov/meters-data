import Style from "./meterInputsList.module.scss";
import { InputField } from "@/components/features/meters-data/form-data-month/form-controls/inputFields";
import { MdInput } from "@/components/ui/input/MdInput";
import { colors } from "@/constants/colors";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { TranslationKeys } from "@/types/i-18-next-types";
import { MeterInput } from "@/components/features/meters-data/form-data-month/form-controls/meter-inputs-list/meter-input/MeterInput";
import { MeterData } from "@/store/models/meter-data";

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
                    style={isEdit ? { backgroundColor: colors.lightGreen } : {}}
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
