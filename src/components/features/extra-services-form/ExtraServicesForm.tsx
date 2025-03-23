import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Styles from "./extraServicesForm.module.scss";
import { MdSelect } from "@/components/ui/select/MdSelect";
import { MdInput } from "@/components/ui/input/MdInput";
import { MdButton } from "@/components/ui/button/MdButton";
import { AppDispatch } from "@/redux/store";
import useUtilityPrices from "@/hooks/useUtilityPrices";
import {
    editValueUtilityPrice,
    filterOptions,
} from "@/components/features/extra-services-form/ExtraServicesForm.funcs";

const fixedWaterString = "Fixed Water";

interface ExtraServicesFormProps {
    dispatch: AppDispatch;
}

export function MdExtraServicesForm({ dispatch }: ExtraServicesFormProps) {
    const { items } = useUtilityPrices();
    const options = filterOptions(items);

    const [selectedOption, setSelectedOption] = useState<string>(options[0]?.category || fixedWaterString);
    const currentItemValue = options.find((item) => item.category === selectedOption)?.value || 0;
    const currentId = options.find((item) => item.category === selectedOption)?._id;

    const [inputValue, setInputValue] = useState<number>(currentItemValue);

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const onEditValueUtilityPrice = useCallback(() => {
        if (currentId && inputValue) {
            editValueUtilityPrice(currentId, String(inputValue), selectedOption, dispatch);
        }
    }, [currentId, inputValue, selectedOption, dispatch]);

    useEffect(() => {
        setInputValue(currentItemValue);
    }, [selectedOption]);

    return (
        <form className={Styles.extraServicesForm}>
            <div className={Styles.inputs}>
                <MdSelect
                    className={Styles.select}
                    options={options}
                    value={selectedOption}
                    onChange={handleSelectChange}
                />

                <MdInput
                    value={inputValue}
                    setValue={setInputValue}
                    className={Styles.input}
                    defaultValue={currentItemValue}
                    labelTextBold
                />
            </div>
            <div className={Styles.btns}>
                <MdButton type="button" onClick={onEditValueUtilityPrice}>
                    add
                </MdButton>
            </div>
        </form>
    );
}
