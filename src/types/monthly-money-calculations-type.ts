import { AddressType } from "./meter-data-type";

export interface MonthlyMoneyCalculationsType {
    _id: string;
    address: AddressType;
    data: [
        {
            _id: string;
            title: string;
            description: string;
            percentDifference: number;
        }
    ];
    sumMoney: number;
}
