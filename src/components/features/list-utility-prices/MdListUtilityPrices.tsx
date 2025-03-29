import { statusNames } from "@/constants/status";
import Styles from "./listUtilityPrices.module.scss";
import { MdItemUtilityPrices } from "@/components/features/list-utility-prices/item-utility-prices/MdItemUtilityPrices";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { getAllUtilityPrice } from "@/store/slices/utility-price-slice";
import { useEffect } from "react";

export function MdListUtilityPrices() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.utilityPrices.items);
    const status = useAppSelector((state) => state.utilityPrices.status);
    const errorMessage = useAppSelector((state) => state.utilityPrices.errorMessage);

    useEffect(() => {
        dispatch(getAllUtilityPrice());
    }, [dispatch]);

    return (
        <ul className={Styles.listUtilityPrices}>
            {status === statusNames.loading && <p className={Styles.loading}>Loading...</p>}
            {status === statusNames.error && <p className={Styles.error}>Error: {errorMessage}</p>}
            {items.map(({ value, valueName, image, category, _id }) => (
                <MdItemUtilityPrices
                    key={category}
                    id={_id}
                    value={value}
                    valueName={valueName}
                    image={image}
                    category={category}
                />
            ))}
        </ul>
    );
}
