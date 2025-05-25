import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styles from "./extraServicesForm.module.scss";
import { MdSelect } from "@/components/ui/select/MdSelect";
import { MdInput } from "@/components/ui/input/MdInput";
import { MdButton } from "@/components/ui/button/MdButton";
import { AppDispatch } from "@/store/store";
import {
    addValueUtilityPrice,
    filterOptions,
} from "@/components/features/extra-services-form/ExtraServicesForm.funcs";
import { colorNames } from "@/enums/color-names";
import { useAppSelector } from "@/store/hook";
import { numberToString } from "@/utils/conversion";
import { selectTranslations } from "@/store/slices/i-18-next";

const fixedWaterString = "Fixed Water";

interface ExtraServicesFormProps {
    dispatch: AppDispatch;
}

export function MdExtraServicesForm({ dispatch }: ExtraServicesFormProps) {
    const items = useAppSelector((state) => state.utilityPrices.items);
    const options = filterOptions(items);
    const translations = useAppSelector(selectTranslations);

    const [selectedOption, setSelectedOption] = useState<string>(options[0]?.category || fixedWaterString);

    const option = options.find((item) => item.category === selectedOption);
    const optionValue = numberToString(option?.value);

    const currentId = options.find((item) => item.category === selectedOption)?._id;

    const [inputValue, setInputValue] = useState<string>(optionValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const returnCurrentValues = () => {
        setInputValue(optionValue);
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const onAddValueUtilityPrice = useCallback(() => {
        if (currentId && inputValue) {
            addValueUtilityPrice(currentId, inputValue, selectedOption, dispatch);
        }
    }, [currentId, inputValue, selectedOption, dispatch]);

    useEffect(() => {
        setInputValue(optionValue);
    }, [selectedOption, optionValue]);

    return (
        <form className={styles.root}>
            <div className={styles.fieldsGroup}>
                <MdSelect
                    options={options}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    labelText={translations.price.addCategory}
                />
                <MdInput
                    value={inputValue}
                    onChange={onChange}
                    onReset={returnCurrentValues}
                    defaultValue={optionValue}
                    label={translations.price.price}
                    step={0.01}
                />
            </div>
            <div className={styles.buttonWrapper}>
                <MdButton type="button" onClick={onAddValueUtilityPrice} color={colorNames.green}>
                    {translations.btn.add}
                </MdButton>
            </div>
        </form>
    );
}
