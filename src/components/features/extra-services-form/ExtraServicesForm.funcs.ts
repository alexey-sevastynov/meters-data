import { addServiceToCurrentItem } from "@/redux/slices/PriceSlice";
import { AppDispatch } from "@/redux/store";
import { categoryNames } from "@/types/category-name";
import { TypeListUtilityPrices } from "@/types/constants";

export function filterOptions(items: TypeListUtilityPrices) {
    const excludedCategories = new Set([
        categoryNames.light,
        categoryNames.lightDay,
        categoryNames.lightNight,
        categoryNames.water,
        categoryNames.gas,
    ]);

    return items.filter(({ category }) => !excludedCategories.has(category));
}

export function editValueUtilityPrice(
    id: string,
    inputValue: string,
    selectedOption: string,
    dispatch: AppDispatch
) {
    if (!id && !inputValue) return;

    dispatch(
        addServiceToCurrentItem({
            title: selectedOption,
            description: inputValue,
            percentDifference: 0,
        })
    );
}
