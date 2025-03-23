import Style from "./meterInputsList.module.scss";
import { InputField } from "@/components/features/meters-data/form-data-month/form-controls/inputFields";
import { MeterDataType } from "@/types/MeterDataType";
import { MdInput } from "@/components/ui/input/MdInput";
import { colors } from "@/constants/colors";
import { setDefaultValue } from "@/components/features/meters-data/form-data-month/formDataMonth.funcs";
import { TranslationKeys } from "@/types/I18nextTypes";
import { MeterInput } from "@/components/features/meters-data/form-data-month/form-controls/meter-inputs-list/meter-input/MeterInput";

interface MeterInputsListProps {
    items: InputField[];
    isEdit: boolean;
    meterDataEdit: MeterDataType | null;
    currentPage: string;
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
