import { CalculationDataWithId } from "@/types/calculation-data-with-id";
import { WithObjectId } from "@/types/with-object-id";

export interface MonthlyMoneyCalculationWithObjectId extends WithObjectId, MonthlyMoneyCalculation {}

export interface MonthlyMoneyCalculation {
    address: string;
    data: CalculationDataWithId[];
    sumMoney: number;
}
