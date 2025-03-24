import { addServiceToCurrentItem } from "@/redux/slices/price-slice";
import { AppDispatch } from "@/redux/store";
import { categoryNames } from "@/enums/category-names";
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
