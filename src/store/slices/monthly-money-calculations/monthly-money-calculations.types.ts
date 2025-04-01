import { StatusName, statusNames } from "@/constants/status";
import { MonthlyMoneyCalculationsWithObjectId } from "@/store/models/monthly-money-calculations";
import { UtilityCost } from "@/types/utility-cost";

export const initialState: IMonthlyMoneyCalculationsSlice = {
    status: statusNames.inactive,
    items: null,
    isEdit: false,
    idEdit: null,
    utilityCosts: null,
    sumMoney: 0,
};

export interface IMonthlyMoneyCalculationsSlice {
    status: StatusName;
    items: MonthlyMoneyCalculationsWithObjectId[] | null;
    isEdit: boolean;
    idEdit: string | null;
    utilityCosts: UtilityCost[] | null;
    sumMoney: number;
}
