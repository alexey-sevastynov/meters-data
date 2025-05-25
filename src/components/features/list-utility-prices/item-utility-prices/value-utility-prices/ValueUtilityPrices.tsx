import { ChangeEvent, useState } from "react";
import styles from "./valueUtilityPrices.module.scss";
import { MdInput } from "@/components/ui/input/MdInput";
import { MdButton } from "@/components/ui/button/MdButton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { updateUtilityPrice, getAllUtilityPrice } from "@/store/slices/utility-price-slice";
import { selectTranslations } from "@/store/slices/i-18-next";
import { numberToString, stringToNumber } from "@/utils/conversion";

interface ValueUtilityPricesProps {
    id: string;
    valueName: "kW" | "m³" | "piece";
    value: number;
}

export function ValueUtilityPrices({ valueName, value, id }: ValueUtilityPricesProps) {
    const dispatch = useAppDispatch();
    const translations = useAppSelector(selectTranslations);

    const [valueInput, setInputValue] = useState<string>(numberToString(value));

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const returnCurrentValues = () => {
        setInputValue(numberToString(value));
    };

    const editValueUtilityPrice = () => {
        if (id && valueInput) {
            dispatch(updateUtilityPrice({ _id: id, value: stringToNumber(valueInput) })).then((action) => {
                if (action.payload) {
                    setTimeout(() => {
                        dispatch(getAllUtilityPrice());
                    }, 2500);
                }
            });
        }
    };

    return (
        <div className={styles.root}>
            <p>1 {translations.value[valueName]} =</p>
            <MdInput
                value={valueInput}
                onChange={onChange}
                onReset={returnCurrentValues}
                defaultValue={numberToString(value)}
                label={translations.home.price}
                step={0.01}
            />
            <MdButton
                type="button"
                disabled={valueInput === numberToString(value)}
                onClick={editValueUtilityPrice}
            >
                {translations.btn.save}
            </MdButton>
        </div>
    );
}
