import { ChangeEvent, useState } from "react";
import Styles from "./valueUtilityPrices.module.scss";
import { MdInput } from "@/components/ui/input/MdInput";
import { MdButton } from "@/components/ui/button/MdButton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { updateUtilityPrice, getAllUtilityPrice } from "@/store/slices/utility-price-slice";
import { selectTranslations } from "@/store/slices/i-18-next";

interface ValueUtilityPricesProps {
    id: string;
    valueName: "kW" | "m³" | "piece";
    value: number;
}

export function ValueUtilityPrices({ valueName, value, id }: ValueUtilityPricesProps) {
    const dispatch = useAppDispatch();
    const lang = useAppSelector(selectTranslations);

    const [valueInput, setInputValue] = useState<number>(value);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetValue = Number(e.target.value);

        setInputValue(targetValue);
    };

    const returnCurrentValues = () => {
        setInputValue(value);
    };

    const editValueUtilityPrice = () => {
        if (id && valueInput) {
            dispatch(updateUtilityPrice({ _id: id, value: valueInput })).then((action) => {
                if (action.payload) {
                    setTimeout(() => {
                        dispatch(getAllUtilityPrice());
                    }, 2500);
                }
            });
        }
    };

    return (
        <div className={Styles.valueUtilityPrices}>
            <p>1 {lang.value[valueName]} =</p>

            <MdInput
                value={valueInput}
                onChange={onChange}
                onReset={returnCurrentValues}
                defaultValue={value}
                label="Price"
            />

            <MdButton type="button" disabled={valueInput === value} onClick={editValueUtilityPrice}>
                {lang.home.publish}
            </MdButton>
        </div>
    );
}
