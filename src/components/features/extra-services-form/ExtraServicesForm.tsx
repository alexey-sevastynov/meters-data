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
import { MdIcon } from "@/components/ui/icon/MdIcon";
import { iconNames } from "@/components/ui/icon/icon-constants";
import { Option } from "@/components/ui/select/select-models";
import { MdListCategoriesWithPrices } from "@/components/features/list-categories-with-prices/ListCategoriesWithPrices";

interface ExtraServicesFormProps {
    dispatch: AppDispatch;
}

export function MdExtraServicesForm({ dispatch }: ExtraServicesFormProps) {
    const items = useAppSelector((state) => state.utilityPrices.items);
    const translations = useAppSelector(selectTranslations);
    const utilityPrices = filterOptions(items);

    const [selectedOption, setSelectedOption] = useState<Option>({
        label: utilityPrices[0].category,
        value: utilityPrices[0].category,
    });

    const option = utilityPrices.find((utilityPrice) => utilityPrice.category === selectedOption.value);
    const optionValue = numberToString(option?.value);

    const currentId = utilityPrices.find(
        (utilityPrice) => utilityPrice.category === selectedOption.value,
    )?._id;

    const [inputValue, setInputValue] = useState<string>(optionValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const returnCurrentValues = () => {
        setInputValue(optionValue);
    };

    const onAddValueUtilityPrice = useCallback(() => {
        if (currentId && inputValue) {
            addValueUtilityPrice(currentId, inputValue, selectedOption.value, dispatch);
        }
    }, [currentId, inputValue, selectedOption, dispatch]);

    useEffect(() => {
        setInputValue(optionValue);
    }, [selectedOption, optionValue]);

    return (
        <form className={styles.root}>
            <div className={styles.header}>
                <MdIcon name={iconNames.plus} color={colorNames.green} />
                <p>{translations.price.addNewAccount}</p>
            </div>
            <div className={styles.content}>
                <div className={styles.fields}>
                    <div className={styles.inputWrapper}>
                        <MdSelect
                            options={utilityPrices.map((item) => ({
                                label: item.category,
                                value: item.category,
                            }))}
                            value={selectedOption}
                            onChange={(newOption) => setSelectedOption(newOption)}
                            labelText={translations.price.addCategory}
                        />
                        <MdInput
                            value={inputValue}
                            onChange={onChange}
                            onReset={returnCurrentValues}
                            defaultValue={optionValue}
                            label={translations.price.price}
                            step={0.01}
                            className={styles.input}
                        />
                    </div>
                </div>
                <div className={styles.buttonWrapper}>
                    <MdButton type="button" onClick={onAddValueUtilityPrice} color={colorNames.green}>
                        {translations.btn.add}
                    </MdButton>
                </div>
            </div>

            <MdListCategoriesWithPrices dispatch={dispatch} />
        </form>
    );
}
