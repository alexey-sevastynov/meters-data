import { useState } from "react";
import Styles from "./valueUtilityPrices.module.scss";
import { MdInput } from "@/components/ui/input/MdInput";
import { MdButton } from "@/components/ui/button/MdButton";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { editServicePrice, fetchAllServices } from "@/store/slices/services-slice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectTranslations } from "@/store/slices/i-18-next";

interface ValueUtilityPricesProps {
    id: string;
    valueName: "kW" | "m³" | "piece";
    value: number;
}

export function ValueUtilityPrices({ valueName, value, id }: ValueUtilityPricesProps) {
    const dispatch = useAppDispatch();
    const lang = useAppSelector(selectTranslations);

    const [valueInput, setValueInput] = useState<number>(value);

    const editValueUtilityPrice = () => {
        if (id && valueInput) {
            dispatch(editServicePrice({ _id: id, value: valueInput })).then((action) => {
                if (action.payload) {
                    setTimeout(() => {
                        dispatch(fetchAllServices());
                    }, 2500);
                }
            });
        }
    };

    return (
        <div className={Styles.valueUtilityPrices}>
            <p>1 {lang.value[valueName]} =</p>

            <MdInput value={valueInput} setValue={setValueInput} defaultValue={value} />

            <MdButton type="button" disabled={valueInput === value} onClick={editValueUtilityPrice}>
                {lang.home.publish}
            </MdButton>

            <ToastContainer
                position="bottom-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeButton={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
