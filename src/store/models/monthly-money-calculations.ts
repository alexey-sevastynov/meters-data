import { WithId } from "@/types/with-id";
import { CalculationData } from "@/store/models/calculation-data";

export interface MonthlyMoneyCalculations extends WithId {
    address: string;
    data: CalculationData[];
    sumMoney: number;
}
