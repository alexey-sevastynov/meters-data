import { addUtilityItem } from "@/store/slices/monthly-money-calculations/slice";
import { AppDispatch } from "@/store/store";
import { categoryNames } from "@/enums/category-names";
import { UtilityPrice } from "@/store/models/utility-price";

export function filterOptions(items: UtilityPrice[]) {
    const excludedCategories: Set<string> = new Set([
        categoryNames.light,
        categoryNames.lightDay,
        categoryNames.lightNight,
        categoryNames.water,
        categoryNames.gas,
    ]);

    return items.filter(({ category }) => !excludedCategories.has(category));
}

export function addValueUtilityPrice(
    id: string,
    inputValue: string,
    selectedOption: string,
    dispatch: AppDispatch
) {
    if (!id && !inputValue) return;

    dispatch(
        addUtilityItem({
            title: selectedOption,
            description: inputValue,
            percentDifference: 0,
        })
    );
}
