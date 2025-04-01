import { CalculationDataWithId } from "@/types/calculation-data-with-id";
import { WithObjectId } from "@/types/with-object-id";

export interface MonthlyMoneyCalculationsWithObjectId extends WithObjectId, MonthlyMoneyCalculations {}

export interface MonthlyMoneyCalculations {
    address: string;
    data: CalculationDataWithId[];
    sumMoney: number;
}
