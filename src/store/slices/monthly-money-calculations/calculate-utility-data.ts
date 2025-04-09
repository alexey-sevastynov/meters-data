import { UtilityPrice } from "@/store/models/utility-price";
import { UtilityCost } from "@/types/utility-cost";
import { CategoryName, categoryNames } from "@/enums/category-names";
import { titlesForMeterReadings } from "@/constants/titles-for-meter-readings";
import { stringToNumber } from "@/utils/conversion";

const emptyPrice = "0.00";

export function calculateUtilityData(listInfoDataMonth: UtilityCost[] | null, utilityPrices: UtilityPrice[]) {
    if (!listInfoDataMonth || utilityPrices.length === 0) return { updatedItems: null, totalSum: 0 };

    const { updatedItems, totalSum } = getUpdatedUtilityItems(listInfoDataMonth, utilityPrices);

    return {
        updatedItems: updatedItems.length ? updatedItems : null,
        totalSum: stringToNumber(totalSum.toFixed(1)),
    };
}

function getUpdatedUtilityItems(listInfoDataMonth: UtilityCost[], utilityPrices: UtilityPrice[]) {
    let totalSum = 0;

    const updatedItems = listInfoDataMonth.reduce<UtilityCost[]>((acc, item) => {
        const { updatedItem, itemSum } = calculateItemPrice(item, utilityPrices);
        totalSum += itemSum;

        if (updatedItem.title !== titlesForMeterReadings.light && updatedItem.description !== emptyPrice) {
            acc.push(updatedItem);
        }

        return acc;
    }, []);

    return { updatedItems, totalSum };
}

function getPriceByCategory(utilityPrices: UtilityPrice[], category: CategoryName) {
    const defaultValue = 0;
    const price = utilityPrices.find((item) => item.category === category)?.value;

    return price || defaultValue;
}

function calculateItemPrice(item: UtilityCost, utilityPrices: UtilityPrice[]) {
    const categoryToPriceMap: Record<string, number> = {
        [titlesForMeterReadings.lightDay]: getPriceByCategory(utilityPrices, categoryNames.lightDay),
        [titlesForMeterReadings.lightNight]: getPriceByCategory(utilityPrices, categoryNames.lightNight),
        [titlesForMeterReadings.gas]: getPriceByCategory(utilityPrices, categoryNames.gas),
        [titlesForMeterReadings.water]: getPriceByCategory(utilityPrices, categoryNames.water),
    };

    const pricePerUnit = categoryToPriceMap[item.title];

    if (!pricePerUnit || item.description === emptyPrice) return { updatedItem: item, itemSum: 0 };

    const result = stringToNumber(item.description) * pricePerUnit;
    const textDescription = `${item.description} * ${pricePerUnit} uah = ${result.toFixed(2)}`;

    return { updatedItem: { ...item, description: textDescription }, itemSum: result };
}
